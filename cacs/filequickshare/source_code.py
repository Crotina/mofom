import os
import socket
import sys
import threading
import tkinter as tk
from tkinter import scrolledtext, ttk
from flask import Flask, request, redirect, url_for, send_from_directory, render_template_string, send_file
import webbrowser
import zipfile
import io
import subprocess
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import logging
from datetime import datetime

# -------------------------------
# Flask 文件分享部分
# -------------------------------
UPLOAD_FOLDER = os.path.abspath("shared_files")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 配置日志
LOG_FOLDER = os.path.abspath("logs")
os.makedirs(LOG_FOLDER, exist_ok=True)
log_file = os.path.join(LOG_FOLDER, f"file_share_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8'),
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

file_sources = {}


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        files = request.files.getlist("file")
        for file in files:
            if file:
                filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
                file.save(filepath)
                uploader_ip = request.remote_addr
                file_sources[file.filename] = uploader_ip
        return redirect(url_for("index"))

    files = os.listdir(app.config["UPLOAD_FOLDER"])
    return render_template_string("""
    <!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <title>file quick share</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 800px;
                margin: auto;
                padding: 20px;
            }
            h1 {
                text-align: center;
                margin-bottom: 20px;
            }
            form {
                margin-bottom: 20px;
            }
            input[type="file"], button {
                width: 100%;
                padding: 10px;
                margin-top: 10px;
                font-size: 16px;
            }
            button {
                background-color: #007bff;
                color: white;
                border: none;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
            ul {
                list-style: none;
                padding: 0;
            }
            li {
                background: white;
                margin-bottom: 10px;
                padding: 10px;
                border: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                align-items: center;
                word-wrap: break-word;
            }
            a {
                text-decoration: none;
                color: #007bff;
            }
            a:hover {
                text-decoration: underline;
            }
            .actions {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
            }
            .btn-danger {
                background-color: #dc3545;
                color: white;
                padding: 10px;
                border: none;
                cursor: pointer;
            }
            .btn-success {
                background-color: #28a745;
                color: white;
                padding: 10px;
                border: none;
                cursor: pointer;
            }
            .btn-danger:hover { background-color: #a71d2a; }
            .btn-success:hover { background-color: #1e7e34; }
            @media (max-width: 600px) {
                li {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .actions {
                    flex-direction: column;
                }
                .actions a {
                    margin-bottom: 10px;
                    width: 100%;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📂 FILE QUICK SHARE</h1>
            <form method="post" enctype="multipart/form-data">
                <input type="file" name="file" multiple>
                <button type="submit">上传</button>
            </form>
            <h2>uploaded</h2>
            <ul>
                {% for f in files %}
                    <li>
                        <div>
                            <a href="{{ url_for('download_file', filename=f) }}">{{ f }}</a>
                            <small style="color:gray;">(from {{ file_sources.get(f, "未知IP") }})</small>
                        </div>
                        <a href="{{ url_for('delete_file', filename=f) }}" class="btn-danger">clear</a>
                    </li>
                {% endfor %}
            </ul>
            <div class="actions">
                <a href="{{ url_for('download_all') }}" class="btn-success">download all</a>
                <a href="{{ url_for('delete_all') }}" class="btn-danger">clear all</a>
            </div>
        </div>
    </body>
    </html>
    """, files=files, file_sources=file_sources)


@app.route("/download/<filename>")
def download_file(filename):
    try:
        abs_path = os.path.abspath(app.config["UPLOAD_FOLDER"])
        return send_from_directory(abs_path, filename, as_attachment=True)
    except Exception as e:
        logger.error(f"下载错误: {e}")
        return f"文件下载失败: {str(e)}", 404


@app.route("/delete/<filename>")
def delete_file(filename):
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    if os.path.exists(filepath):
        os.remove(filepath)
        file_sources.pop(filename, None)
    return redirect(url_for("index"))


@app.route("/delete_all")
def delete_all():
    for f in os.listdir(app.config["UPLOAD_FOLDER"]):
        os.remove(os.path.join(app.config["UPLOAD_FOLDER"], f))
    file_sources.clear()
    return redirect(url_for("index"))


@app.route("/download_all")
def download_all():
    try:
        memory_file = io.BytesIO()
        abs_path = os.path.abspath(app.config["UPLOAD_FOLDER"])
        with zipfile.ZipFile(memory_file, "w", zipfile.ZIP_DEFLATED) as zf:
            for f in os.listdir(abs_path):
                file_path = os.path.join(abs_path, f)
                if os.path.isfile(file_path):
                    zf.write(file_path, f)
        memory_file.seek(0)
        return send_file(memory_file, download_name="all_files.zip", as_attachment=True, mimetype='application/zip')
    except Exception as e:
        logger.error(f"打包下载错误: {e}")
        return f"文件打包失败: {str(e)}", 500


def run_flask():
    app.run(host="0.0.0.0", port=5000, debug=False)


# -------------------------------
# Tkinter 图形界面部分
# -------------------------------
def show_status_message(message, level="info"):
    """在状态栏显示消息,替代messagebox"""
    global status_message_label

    colors = {
        "info": "#17a2b8",
        "success": "#28a745",
        "warning": "#ffc107",
        "error": "#dc3545"
    }

    status_message_label.config(
        text=message,
        fg=colors.get(level, "#17a2b8")
    )

    # 5秒后清除消息
    root.after(5000, lambda: status_message_label.config(text=""))


def start_server_and_open():
    """启动服务并在浏览器中打开"""
    global status_label, start_button

    logger.info("用户点击启动服务按钮")

    start_button.config(state="disabled", text="服务运行中", bg="#cccccc")
    threading.Thread(target=run_flask, daemon=True).start()
    logger.info("Flask服务器已启动")

    try:
        ip = socket.gethostbyname(socket.gethostname())
        logger.info(f"服务地址: http://{ip}:5000")
    except:
        ip = "127.0.0.1"
        logger.warning("无法获取本机IP,使用127.0.0.1")

    status_label.config(text=f"● 服务运行中 | {ip}:5000", fg="#28a745", font=("Arial", 12, "bold"))

    root.after(500, lambda: open_local_service(ip))


def open_local_service(ip):
    """在浏览器中打开本机服务"""
    url = f"http://{ip}:5000"
    webbrowser.open(url)
    show_status_message(f"✓ 服务已启动 | {url}", "success")


def connect_to_ip():
    """连接到指定IP的文件分享服务"""
    global ip_entry

    target_ip = ip_entry.get().strip()
    logger.info(f"用户尝试连接到: {target_ip}")

    if not target_ip:
        show_status_message("⚠ 请输入IP地址", "warning")
        logger.warning("用户未输入IP地址")
        return

    try:
        socket.inet_aton(target_ip)
    except socket.error:
        show_status_message("✗ 无效的IP地址格式", "error")
        logger.error(f"无效的IP地址格式: {target_ip}")
        return

    url = f"http://{target_ip}:5000"
    webbrowser.open(url)
    logger.info(f"已在浏览器打开: {url}")
    show_status_message(f"✓ 已连接到 {target_ip}", "success")


def check_port(ip, port=5000, timeout=2):
    """检查指定IP的端口是否开放"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        result = sock.connect_ex((ip, port))
        sock.close()
        logger.info(f"端口检测 {ip}:{port} - {'成功' if result == 0 else '失败'}")
        return result == 0
    except Exception as e:
        logger.error(f"端口检测错误 {ip}:{port} - {str(e)}")
        return False


def get_hostname(ip):
    """获取IP对应的主机名"""
    try:
        hostname = socket.gethostbyaddr(ip)[0]
        logger.info(f"获取主机名 {ip} -> {hostname}")
        return hostname
    except:
        logger.warning(f"无法获取主机名 {ip}")
        return None


def get_local_network():
    """获取本机所在的网段"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        logger.info(f"本机IP: {local_ip}")
        return local_ip
    except Exception as e:
        logger.error(f"获取本机IP失败: {str(e)}")
        return None


def get_arp_devices():
    """通过ARP表获取局域网中的活跃设备IP列表"""
    devices = []
    try:
        logger.info("开始执行ARP扫描")

        if sys.platform == "win32":
            result = subprocess.run(['arp', '-a'], capture_output=True, text=True, encoding='gbk', errors='ignore')
        else:
            result = subprocess.run(['arp', '-a'], capture_output=True, text=True, errors='ignore')

        output = result.stdout
        logger.debug(f"ARP输出: {output[:200]}...")

        if sys.platform == "win32":
            pattern = r'(\d+\.\d+\.\d+\.\d+)\s+([0-9a-fA-F-]+)\s+动态'
        else:
            pattern = r'(\d+\.\d+\.\d+\.\d+)\s+.*\s+([0-9a-fA-F:]+)'

        matches = re.findall(pattern, output)

        for match in matches:
            ip = match[0]
            if not ip.startswith('224.') and not ip.endswith('.255'):
                devices.append(ip)

        logger.info(f"ARP扫描完成,发现 {len(devices)} 个设备")
        return devices
    except Exception as e:
        logger.error(f"ARP扫描错误: {str(e)}")
        return []


def scan_network():
    """扫描局域网中所有开放5000端口的设备"""
    global scan_button, device_buttons_frame

    logger.info("用户点击扫描按钮")

    scan_button.config(state="disabled", text="扫描中...")

    # 清空之前的设备按钮和提示
    for widget in device_buttons_frame.winfo_children():
        widget.destroy()

    # 显示扫描中提示
    scanning_label = tk.Label(device_buttons_frame,
                              text="🔍 正在扫描局域网设备...",
                              font=("Arial", 10),
                              bg="#f0f0f0",
                              fg="#17a2b8")
    scanning_label.pack(pady=30)

    def do_scan():
        local_ip = get_local_network()

        if not local_ip:
            root.after(0, lambda: scan_button.config(state="normal", text="开始扫描"))
            root.after(0, lambda: show_status_message("✗ 无法获取本机网络信息", "error"))
            logger.error("无法获取本机网络信息")
            return

        arp_devices = get_arp_devices()

        if local_ip not in arp_devices:
            arp_devices.insert(0, local_ip)

        found_devices = []

        with ThreadPoolExecutor(max_workers=10) as executor:
            future_to_ip = {executor.submit(check_port, ip, 5000, 1.5): ip
                            for ip in arp_devices}

            for future in as_completed(future_to_ip):
                ip = future_to_ip[future]
                try:
                    if future.result():
                        hostname = get_hostname(ip)
                        found_devices.append({'ip': ip, 'hostname': hostname})

                        # 清除扫描中提示(仅第一次)
                        if len(found_devices) == 1:
                            root.after(0, lambda: scanning_label.destroy())

                        root.after(0, lambda i=ip, h=hostname, l=local_ip: add_device_button(i, h, l))

                except Exception as e:
                    logger.error(f"扫描设备失败 {ip}: {str(e)}")

        # 重新启用扫描按钮
        root.after(0, lambda: scan_button.config(state="normal", text="开始扫描"))
        logger.info(f"扫描完成,发现 {len(found_devices)} 个设备")

        if not found_devices:
            root.after(0, lambda: scanning_label.config(
                text=f"未发现设备\n\n, 如果该设备的确和您连接到了同一个网络, 请尝试在 \"直接连接\" 输入对方的网络地址",
                fg="#999999"
            ))
            root.after(0, lambda: show_status_message("扫描完成,未发现运行中的服务", "info"))
        else:
            root.after(0, lambda: show_status_message(f"✓ 发现 {len(found_devices)} 个设备", "success"))

    threading.Thread(target=do_scan, daemon=True).start()


def add_device_button(ip, hostname, local_ip):
    """为单个发现的设备立即创建访问按钮"""
    global device_buttons_frame

    def make_callback(target_ip):
        return lambda: open_device(target_ip)

    is_local = (ip == local_ip)
    btn_text = f"{ip}"
    if hostname and hostname != ip:
        btn_text += f" ({hostname})"
    if is_local:
        btn_text += " [本机]"

    btn_color = "#28a745" if is_local else "#17a2b8"

    item_frame = tk.Frame(device_buttons_frame, bg="#ffffff", relief="solid", borderwidth=1)
    item_frame.pack(fill="x", pady=3, padx=5)

    ip_label = tk.Label(item_frame,
                        text=btn_text,
                        font=("Arial", 10),
                        bg="#ffffff",
                        fg="#333333",
                        anchor="w")
    ip_label.pack(side="left", padx=10, pady=8, fill="x", expand=True)

    connect_btn = tk.Button(item_frame,
                            text="连接",
                            command=make_callback(ip),
                            font=("Arial", 9, "bold"),
                            bg=btn_color,
                            fg="white",
                            width=8,
                            cursor="hand2",
                            relief="flat")
    connect_btn.pack(side="right", padx=10, pady=5)

    root.update_idletasks()


def open_device(ip):
    """在浏览器中打开指定设备的文件分享服务"""
    url = f"http://{ip}:5000"
    webbrowser.open(url)
    logger.info(f"用户打开设备: {url}")
    show_status_message(f"✓ 已打开 {ip}", "success")


def resource_path(relative_path):
    """获取资源文件的正确路径,兼容打包和未打包状态"""
    if hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, relative_path)
    return os.path.join(os.path.abspath("."), relative_path)


def main_gui():
    global root, status_label, start_button, scan_button, device_buttons_frame, ip_entry, status_message_label

    root = tk.Tk()
    root.title("File Quick Share")
    root.geometry("700x700")
    root.resizable(False, False)

    try:
        root.iconbitmap(resource_path("appicon.ico"))
    except:
        pass

    root.config(bg="#f0f0f0")

    # 标题区域
    title_frame = tk.Frame(root, bg="#007bff", height=80)
    title_frame.pack(fill="x")
    title_frame.pack_propagate(False)

    tk.Label(title_frame, text="File Quick Share",
             font=("Arial", 18, "bold"),
             bg="#007bff",
             fg="white").pack(pady=25)

    # 状态区域
    status_frame = tk.Frame(root, bg="#f0f0f0")
    status_frame.pack(pady=10)

    status_label = tk.Label(status_frame,
                            text="○ 服务未启动",
                            font=("Arial", 12),
                            fg="#dc3545",
                            bg="#f0f0f0")
    status_label.pack()

    # 状态消息标签(替代messagebox)
    status_message_label = tk.Label(root,
                                    text="",
                                    font=("Arial", 10, "bold"),
                                    bg="#f0f0f0",
                                    fg="#17a2b8")
    status_message_label.pack(pady=5)

    notebook = ttk.Notebook(root)
    notebook.pack(pady=10, padx=20, fill="both", expand=True)

    # ==================== 标签页1: 启动文件分享 ====================
    tab1 = tk.Frame(notebook, bg="#f0f0f0")
    notebook.add(tab1, text="  启动文件分享  ")

    info_label1 = tk.Label(tab1,
                           text="在本机启动文件分享服务,其他设备可通过局域网访问",
                           font=("Arial", 10),
                           bg="#f0f0f0",
                           fg="#555555")
    info_label1.pack(pady=20)

    start_button = tk.Button(tab1,
                             text="启动文件分享服务",
                             command=start_server_and_open,
                             font=("Arial", 13, "bold"),
                             bg="#28a745",
                             fg="white",
                             width=25,
                             height=2,
                             cursor="hand2",
                             relief="flat")
    start_button.pack(pady=20)

    tips_frame1 = tk.Frame(tab1, bg="#ffffff", relief="solid", borderwidth=1)
    tips_frame1.pack(pady=20, padx=30, fill="both", expand=True)

    tips_text1 = tk.Text(tips_frame1,
                         height=12,
                         font=("Arial", 10),
                         bg="#ffffff",
                         wrap="word",
                         relief="flat",
                         state="disabled")
    tips_text1.pack(padx=10, pady=10, fill="both", expand=True)

    tips_content = """
点击按钮启动文件分享后，连接到同一网络的其他人可以在 "连接到其他人" -> "开始扫描" 中找到您

Made by KawaiiTech 2025
"""

    tips_text1.config(state="normal")
    tips_text1.insert(1.0, tips_content)
    tips_text1.config(state="disabled")

    # ==================== 标签页2: 连接到文件分享 ====================
    tab2 = tk.Frame(notebook, bg="#f0f0f0")
    notebook.add(tab2, text="  连接到其他人  ")

    info_label2 = tk.Label(tab2,
                           text="连接到其他人开启的文件分享",
                           font=("Arial", 10),
                           bg="#f0f0f0",
                           fg="#555555")
    info_label2.pack(pady=15)

    sub_notebook = ttk.Notebook(tab2)
    sub_notebook.pack(pady=5, padx=20, fill="both", expand=True)

    # ========== 子标签页1: 自动扫描 ==========
    sub_tab1 = tk.Frame(sub_notebook, bg="#f0f0f0")
    sub_notebook.add(sub_tab1, text=" 自动扫描 ")

    scan_info = tk.Label(sub_tab1,
                         text="自动扫描局域网中的其他人",
                         font=("Arial", 9),
                         bg="#f0f0f0",
                         fg="#666666")
    scan_info.pack(pady=20)

    scan_button = tk.Button(sub_tab1,
                            text="开始扫描",
                            command=scan_network,
                            font=("Arial", 12, "bold"),
                            bg="#17a2b8",
                            fg="white",
                            width=20,
                            height=2,
                            cursor="hand2",
                            relief="flat")
    scan_button.pack(pady=10)

    devices_label = tk.Label(sub_tab1,
                             text="发现的设备：",
                             font=("Arial", 10, "bold"),
                             bg="#f0f0f0")
    devices_label.pack(anchor="w", padx=30, pady=(20, 5))

    devices_canvas_frame = tk.Frame(sub_tab1, bg="#f0f0f0")
    devices_canvas_frame.pack(fill="both", expand=True, padx=30, pady=(0, 20))

    devices_canvas = tk.Canvas(devices_canvas_frame, bg="#f0f0f0", highlightthickness=0, height=250)
    devices_scrollbar = tk.Scrollbar(devices_canvas_frame, orient="vertical", command=devices_canvas.yview)

    device_buttons_frame = tk.Frame(devices_canvas, bg="#f0f0f0")

    devices_canvas.create_window((0, 0), window=device_buttons_frame, anchor="nw")
    devices_canvas.configure(yscrollcommand=devices_scrollbar.set)

    devices_canvas.pack(side="left", fill="both", expand=True)
    devices_scrollbar.pack(side="right", fill="y")

    def update_scroll_region(event=None):
        devices_canvas.configure(scrollregion=devices_canvas.bbox("all"))

    device_buttons_frame.bind("<Configure>", update_scroll_region)

    no_devices_label = tk.Label(device_buttons_frame,
                                text="点击 \"开始扫描\" 来搜索局域网内的其他人",
                                font=("Arial", 9),
                                bg="#f0f0f0",
                                fg="#999999")
    no_devices_label.pack(pady=30)

    # ========== 子标签页2: 直接连接 ==========
    sub_tab2 = tk.Frame(sub_notebook, bg="#f0f0f0")
    sub_notebook.add(sub_tab2, text=" 手动连接 ")

    direct_info = tk.Label(sub_tab2,
                           text="如果自动扫描没有找到目标设备，可以尝试在此处手动输入地址连接",
                           font=("Arial", 9),
                           bg="#f0f0f0",
                           fg="#666666")
    direct_info.pack(pady=20)

    input_frame = tk.Frame(sub_tab2, bg="#f0f0f0")
    input_frame.pack(pady=20)

    tk.Label(input_frame, text="输入网络地址：",
             font=("Arial", 11), bg="#f0f0f0").pack(pady=5)

    ip_entry = tk.Entry(input_frame,
                        font=("Arial", 12),
                        width=25,
                        justify="center")
    ip_entry.pack(pady=10)
    ip_entry.insert(0, "")

    connect_button = tk.Button(input_frame,
                               text="连接",
                               command=connect_to_ip,
                               font=("Arial", 12, "bold"),
                               bg="#007bff",
                               fg="white",
                               width=15,
                               height=2,
                               cursor="hand2",
                               relief="flat")
    connect_button.pack(pady=10)

    example_frame = tk.Frame(sub_tab2, bg="#fffbeb", relief="solid", borderwidth=1)
    example_frame.pack(pady=20, padx=40, fill="x")

    example_text = """仅需输入前半段地址，后半段 :5000 程序自动补齐，无需手动填写
"""

    tk.Label(example_frame,
             text=example_text,
             font=("Arial", 9),
             bg="#fffbeb",
             fg="#666666",
             justify="left").pack(padx=15, pady=15)

    footer = tk.Label(root,
                      text="端口: 5000 | 保持此窗口打开以维持服务运行",
                      font=("Arial", 9),
                      fg="#666666",
                      bg="#f0f0f0")
    footer.pack(pady=10)

    root.mainloop()


if __name__ == "__main__":
    logger.info("=" * 50)
    logger.info("程序启动")
    logger.info(f"日志文件: {log_file}")
    logger.info("=" * 50)
    main_gui()