// script.js - 主要JavaScript功能

// 多语言支持
let currentLanguage = 'en-us';
let translations = {};

// 加载语言文件
async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('加载语言文件失败:', error);
    }
}

// 应用翻译
function applyTranslations() {
    // 遍历所有带有id的元素，如果有对应的翻译则更新内容
    Object.keys(translations).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[key];
        }
    });
}

// 初始化语言
document.addEventListener('DOMContentLoaded', function() {
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
    
    // 如果是主页，设置Bing每日图片
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        setBingBackground();
    }
    
    // 如果是产品列表页，加载产品
    if (window.location.pathname.endsWith('products.html')) {
        loadProducts();
    }
    
    // 如果是产品详情页，加载产品详情
    if (window.location.pathname.endsWith('product-detail.html')) {
        loadProductDetail();
    }
});

// 设置Bing每日图片作为背景
async function setBingBackground() {
    try {
        // 使用Bing每日图片API
        const response = await fetch('https://bing.biturl.top/');
        const data = await response.json();
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundImage = `url(${data.url})`;
        }
    } catch (error) {
        console.error('获取Bing图片失败:', error);
        // 使用默认背景
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundImage = 'url(https://source.unsplash.com/random/1600x900/?nature)';
        }
    }
}

// 加载产品列表
async function loadProducts() {
    try {
        // 获取产品数据
        const products = await fetchProducts();
        
        // 渲染产品列表
        const productsContainer = document.getElementById('products-container');
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
        }
    } catch (error) {
        console.error('加载产品失败:', error);
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            productsContainer.innerHTML = '<div class="loading-message">加载产品失败，请稍后重试</div>';
        }
    }
}

// 获取产品数据 - 通过index.json获取文件列表
async function fetchProducts() {
    try {
        const baseUrl = './data';
        
        // 1. 首先加载index.json获取文件列表
        console.log('正在加载产品索引文件...');
        const indexResponse = await fetch(`${baseUrl}/index.json`);
        
        if (!indexResponse.ok) {
            throw new Error(`无法加载索引文件: HTTP ${indexResponse.status}`);
        }
        
        const indexData = await indexResponse.json();
        const productFiles = indexData.files || [];
        
        if (productFiles.length === 0) {
            throw new Error('索引文件中没有产品文件列表');
        }
        
        console.log(`从索引文件找到 ${productFiles.length} 个产品文件:`, productFiles);
        
        // 2. 并行加载所有产品文件
        const productPromises = productFiles.map(async (filename) => {
            try {
                console.log(`正在加载产品文件: ${filename}`);
                const response = await fetch(`${baseUrl}/${filename}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const productData = await response.json();
                
                // 验证必需字段
                if (!productData.name || !productData.description || !productData.images) {
                    console.warn(`产品文件 ${filename} 缺少必需字段，已跳过`);
                    return null;
                }
                
                // 确保产品有ID，如果没有则使用文件名
                if (!productData.id) {
                    productData.id = filename.replace('.json', '');
                }
                
                // 添加文件名信息（用于详情页加载）
                productData.filename = filename;
                
                console.log(`成功加载产品: ${productData.name}`);
                return productData;
                
            } catch (error) {
                console.error(`加载产品文件 ${filename} 失败:`, error);
                return null;
            }
        });
        
        // 等待所有请求完成
        const products = await Promise.all(productPromises);
        
        // 过滤掉无效的产品数据并按名称排序
        const validProducts = products
            .filter(product => product !== null)
            .sort((a, b) => a.name.localeCompare(b.name));
        
        console.log(`成功加载 ${validProducts.length} 个有效产品`);
        return validProducts;
        
    } catch (error) {
        console.error('获取产品数据失败:', error);
        return getFallbackProducts();
    }
}

// 备用产品数据（当远程数据不可用时）
function getFallbackProducts() {
    return [
        {
            id: "trailer1",
            name: "拖车设备",
            description: "高质量拖车设备，适用于各种运输需求",
            images: ["https://source.unsplash.com/random/600x400/?trailer"],
            filename: "trailer1.json"
        },
    ];
}

// 加载产品详情
async function loadProductDetail() {
    try {
        // 从URL获取产品ID
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            console.error('未找到产品ID');
            const container = document.getElementById('product-detail-container');
            if (container) {
                container.innerHTML = '<div class="loading-message">未找到产品ID</div>';
            }
            return;
        }
        
        // 获取产品详情
        const product = await fetchProductDetail(productId);
        
        // 渲染产品详情
        const productDetailContainer = document.getElementById('product-detail-container');
        if (productDetailContainer) {
            productDetailContainer.innerHTML = `
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
            container.innerHTML = '<div class="loading-message">加载产品详情失败，请稍后重试</div>';
        }
    }
}

// 获取产品详情
async function fetchProductDetail(productId) {
    try {
        const baseUrl = './data';
        
        // 直接加载对应的JSON文件
        console.log(`正在加载产品详情: ${productId}`);
        const response = await fetch(`${baseUrl}/${productId}.json`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const productData = await response.json();
        
        // 验证必需字段
        if (!productData.name || !productData.description || !productData.images) {
            throw new Error('产品数据缺少必需字段');
        }
        
        console.log(`成功加载产品详情: ${productData.name}`);
        return productData;
        
    } catch (error) {
        console.error(`加载产品详情 ${productId} 失败:`, error);
        
        // 如果直接加载失败，从产品列表中查找
        try {
            const allProducts = await fetchProducts();
            const foundProduct = allProducts.find(product => 
                product.id === productId || 
                product.filename === `${productId}.json`
            );
            
            if (foundProduct) {
                console.log(`从产品列表中找到产品: ${foundProduct.name}`);
                return foundProduct;
            }
        } catch (fallbackError) {
            console.error('从产品列表查找也失败:', fallbackError);
        }
        
        // 如果都失败，返回错误产品
        return {
            id: productId,
            name: "产品未找到",
            description: "抱歉，找不到您请求的产品。可能的原因：产品ID不正确或产品数据暂时不可用。",
            images: ["https://source.unsplash.com/random/600x400/?error"]
        };
    }
}
