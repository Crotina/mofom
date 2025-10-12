// script.js - 调试版本

// 多语言支持
let currentLanguage = 'zh-cn';
let translations = {};

// 加载语言文件
async function loadLanguage(lang) {
    try {
        console.log(`正在加载语言文件: lang/${lang}.json`);
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        translations = await response.json();
        applyTranslations();
        console.log('语言文件加载成功');
    } catch (error) {
        console.error('加载语言文件失败:', error);
    }
}

// 应用翻译
function applyTranslations() {
    Object.keys(translations).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[key];
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化');
    
    // 设置语言选择器
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', function() {
            currentLanguage = this.value;
            loadLanguage(currentLanguage);
        });
    }
    
    // 加载初始语言
    loadLanguage(currentLanguage);
    
    // 根据页面类型执行不同操作
    const pathname = window.location.pathname;
    console.log('当前页面:', pathname);
    
    if (pathname.endsWith('index.html') || pathname === '/') {
        console.log('检测到主页，设置Bing背景');
        setBingBackground();
    } else if (pathname.endsWith('products.html')) {
        console.log('检测到产品列表页，加载产品');
        loadProducts();
    } else if (pathname.endsWith('product-detail.html')) {
        console.log('检测到产品详情页，加载产品详情');
        loadProductDetail();
    }
});

// 设置Bing每日图片作为背景
async function setBingBackground() {
    try {
        console.log('开始设置Bing背景');
        const response = await fetch('https://bing.biturl.top/');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundImage = `url(${data.url})`;
            console.log('Bing背景设置成功');
        }
    } catch (error) {
        console.error('获取Bing图片失败:', error);
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundImage = 'url(https://source.unsplash.com/random/1600x900/?nature)';
            console.log('使用备用背景图片');
        }
    }
}

// 加载产品列表
async function loadProducts() {
    try {
        console.log('开始加载产品列表');
        const productsContainer = document.getElementById('products-container');
        
        // 显示加载状态
        if (productsContainer) {
            productsContainer.innerHTML = '<div class="loading-message">正在加载产品...</div>';
        }
        
        const products = await fetchProducts();
        console.log('产品数据获取完成:', products);
        
        // 渲染产品列表
        if (productsContainer) {
            productsContainer.innerHTML = '';
            
            if (products.length === 0) {
                productsContainer.innerHTML = '<div class="loading-message">暂无产品</div>';
                return;
            }
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.onclick = () => {
                    window.location.href = `product-detail.html?id=${product.id}`;
                };
                
                productCard.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                `;
                
                productsContainer.appendChild(productCard);
            });
            
            console.log('产品列表渲染完成');
        }
    } catch (error) {
        console.error('加载产品失败:', error);
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            productsContainer.innerHTML = `
                <div class="loading-message">
                    <p>加载产品失败，请稍后重试</p>
                    <p style="font-size: 0.8em; color: #999;">错误: ${error.message}</p>
                </div>
            `;
        }
    }
}

// 获取产品数据 - 调试版本
async function fetchProducts() {
    console.log('开始获取产品数据');
    
    // 首先尝试本地测试数据
    try {
        console.log('尝试加载本地测试数据...');
        const testProducts = await loadLocalTestData();
        if (testProducts.length > 0) {
            console.log('使用本地测试数据成功');
            return testProducts;
        }
    } catch (error) {
        console.log('本地测试数据加载失败:', error);
    }
    
    // 如果本地测试数据失败，尝试远程数据
    try {
        const baseUrl = 'https://mofom.net/data';
        console.log(`尝试从 ${baseUrl} 加载数据...`);
        
        // 1. 加载index.json
        console.log('正在加载 index.json...');
        const indexResponse = await fetch(`${baseUrl}/index.json`);
        console.log('index.json 响应状态:', indexResponse.status);
        
        if (!indexResponse.ok) {
            throw new Error(`无法加载索引文件: HTTP ${indexResponse.status}`);
        }
        
        const indexData = await indexResponse.json();
        console.log('index.json 内容:', indexData);
        
        const productFiles = indexData.files || [];
        console.log('找到产品文件:', productFiles);
        
        if (productFiles.length === 0) {
            throw new Error('索引文件中没有产品文件列表');
        }
        
        // 2. 加载产品文件
        const productPromises = productFiles.map(async (filename) => {
            try {
                console.log(`正在加载 ${filename}...`);
                const response = await fetch(`${baseUrl}/${filename}`);
                console.log(`${filename} 响应状态:`, response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const productData = await response.json();
                console.log(`${filename} 加载成功:`, productData.name);
                
                // 验证必需字段
                if (!productData.name || !productData.description || !productData.images) {
                    console.warn(`${filename} 缺少必需字段`);
                    return null;
                }
                
                // 确保产品有ID
                if (!productData.id) {
                    productData.id = filename.replace('.json', '');
                }
                
                productData.filename = filename;
                return productData;
                
            } catch (error) {
                console.error(`加载 ${filename} 失败:`, error);
                return null;
            }
        });
        
        const products = await Promise.all(productPromises);
        const validProducts = products
            .filter(product => product !== null)
            .sort((a, b) => a.name.localeCompare(b.name));
        
        console.log(`成功加载 ${validProducts.length} 个产品`);
        return validProducts;
        
    } catch (error) {
        console.error('获取远程产品数据失败:', error);
        // 返回备用数据
        return getFallbackProducts();
    }
}

// 本地测试数据
async function loadLocalTestData() {
    // 创建本地测试的index.json数据
    const localIndex = {
        files: [
            "trailer1.json",
            "closed-trailer.json", 
            "trailer-care.json",
            "toolkitcombo.json"
        ]
    };
    
    // 创建本地测试产品数据
    const localProducts = [
        {
            id: "trailer1",
            name: "拖车设备 - 测试数据",
            description: "这是本地测试数据，说明远程数据加载失败",
            images: ["https://source.unsplash.com/random/600x400/?trailer"],
            filename: "trailer1.json"
        },
        {
            id: "closed-trailer",
            name: "封闭式拖车 - 测试数据", 
            description: "这是本地测试数据，请检查网络连接",
            images: ["https://source.unsplash.com/random/600x400/?truck"],
            filename: "closed-trailer.json"
        }
    ];
    
    return localProducts;
}

// 备用产品数据
function getFallbackProducts() {
    return [
        {
            id: "fallback-1",
            name: "示例产品一",
            description: "这是备用产品数据，说明数据加载出现问题",
            images: ["https://source.unsplash.com/random/600x400/?product"]
        },
        {
            id: "fallback-2",
            name: "示例产品二",
            description: "请检查控制台错误信息",
            images: ["https://source.unsplash.com/random/600x400/?tech"]
        }
    ];
}

// 加载产品详情
async function loadProductDetail() {
    try {
        console.log('开始加载产品详情');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        console.log('产品ID:', productId);
        
        if (!productId) {
            throw new Error('未找到产品ID');
        }
        
        const container = document.getElementById('product-detail-container');
        if (container) {
            container.innerHTML = '<div class="loading-message">正在加载产品详情...</div>';
        }
        
        const product = await fetchProductDetail(productId);
        console.log('产品详情加载完成:', product);
        
        if (container) {
            container.innerHTML = `
                <div class="product-detail-container">
                    <div>
                        <img src="${product.images[0]}" alt="${product.name}" class="product-detail-image">
                        ${product.images.length > 1 ? `
                            <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                                ${product.images.slice(1).map(img => 
                                    `<img src="${img}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">`
                                ).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <div class="product-detail-info">
                        <h1>${product.name}</h1>
                        <p>${product.description}</p>
                        <a href="products.html" class="back-button">返回产品列表</a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('加载产品详情失败:', error);
        const container = document.getElementById('product-detail-container');
        if (container) {
            container.innerHTML = `
                <div class="loading-message">
                    <p>加载产品详情失败</p>
                    <p style="font-size: 0.8em; color: #999;">错误: ${error.message}</p>
                    <a href="products.html" class="back-button" style="margin-top: 10px;">返回产品列表</a>
                </div>
            `;
        }
    }
}

// 获取产品详情
async function fetchProductDetail(productId) {
    console.log(`获取产品详情: ${productId}`);
    
    // 首先尝试本地测试数据
    const localProducts = await loadLocalTestData();
    const localProduct = localProducts.find(p => p.id === productId);
    if (localProduct) {
        console.log('从本地测试数据找到产品');
        return localProduct;
    }
    
    // 尝试远程数据
    try {
        const baseUrl = 'https://mofom.net/data';
        console.log(`尝试从远程加载 ${productId}.json`);
        
        const response = await fetch(`${baseUrl}/${productId}.json`);
        console.log(`${productId}.json 响应状态:`, response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const productData = await response.json();
        console.log('远程产品详情加载成功');
        return productData;
        
    } catch (error) {
        console.error('远程产品详情加载失败:', error);
        
        // 返回错误产品
        return {
            id: productId,
            name: "产品未找到",
            description: `无法加载产品详情 (${error.message})`,
            images: ["https://source.unsplash.com/random/600x400/?error"]
        };
    }
}
