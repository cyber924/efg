import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  Filter, 
  Star, 
  ArrowUpRight,
  Eye,
  Check,
  Instagram,
  Facebook,
  Youtube,
  Grid,
  ListFilter
} from 'lucide-react';

const IMAGES = {
  whiteJacketSide: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/hubsheet_5d7a1931-371e-4013-9ccf-198cabca2934_607b1da07d888d1007365aa6",
  whiteJacketStyling: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/hubsheet_5d7a1931-371e-4013-9ccf-198cabca2934_18db1cc8ba3d4a921ac9ef35",
  lookbook: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1792051990814",
  outer: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1791089863336"
};

const PRODUCTS = [
  {
    id: 1,
    name: "시그니처 테일러드 린넨 자켓 (화이트)",
    category: "Outer",
    price: 189000,
    originalPrice: 220000,
    tag: "BEST / 데이트룩",
    rating: 4.9,
    reviews: 128,
    image: IMAGES.whiteJacketSide,
    altImage: IMAGES.whiteJacketStyling,
    description: "우아하고 섬세한 핏으로 완성하는 데이트룩 자켓. 프리미엄 혼방 소재와 클래식 핏.",
    colors: ["#FFFFFF", "#F5F5DC", "#2C2C2C"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 2,
    name: "아틀리에 모던 오버핏 트렌치 아우터",
    category: "Outer",
    price: 245000,
    originalPrice: 289000,
    tag: "NEW COLLECTION",
    rating: 4.8,
    reviews: 94,
    image: IMAGES.outer,
    altImage: IMAGES.lookbook,
    description: "모던한 실루엣과 고급스러운 벨티드 디테일이 돋보이는 룩북 아우터 컬렉션.",
    colors: ["#C4A484", "#2C2C2C", "#FAF0E6"],
    sizes: ["FREE"]
  },
  {
    id: 3,
    name: "에센셜 데이트룩 스티치 블레이저",
    category: "Outer",
    price: 168000,
    originalPrice: 195000,
    tag: "STYLING PICK",
    rating: 4.9,
    reviews: 156,
    image: IMAGES.whiteJacketStyling,
    altImage: IMAGES.whiteJacketSide,
    description: "스튜디오 감성의 톤온톤 스타일링. 데일리와 스페셜 데이 모두 연출 가능한 시그니처 룩.",
    colors: ["#FFFFFF", "#E5E5E5"],
    sizes: ["S", "M"]
  },
  {
    id: 4,
    name: "24FW 캡슐 룩북 벨티드 메리노 드레스 & 아우터",
    category: "Lookbook",
    price: 278000,
    originalPrice: 310000,
    tag: "LOOKBOOK EDITION",
    rating: 5.0,
    reviews: 67,
    image: IMAGES.lookbook,
    altImage: IMAGES.outer,
    description: "감각적인 시선으로 풀어낸 브랜드 뮤즈 컬렉션. 은은한 실루엣과 완벽한 드레이프.",
    colors: ["#3D3C3A", "#E3D5CA"],
    sizes: ["S", "M"]
  }
];

const LOOKBOOK_ITEMS = [
  {
    id: "lb1",
    title: "Urban Romantic White Suite",
    subtitle: "맑은 화이트 자켓의 화사한 텍스처와 측면 라인",
    image: IMAGES.whiteJacketSide,
    tag: "데이트룩 라인업"
  },
  {
    id: "lb2",
    title: "Effortless Styling Moment",
    subtitle: "자연스러운 내추럴 핏과 톤온톤 스타일링 매치",
    image: IMAGES.whiteJacketStyling,
    tag: "스타일 연출집"
  },
  {
    id: "lb3",
    title: "Autumn Capsule Mood",
    subtitle: "차분하고 지적인 무드를 선사하는 시즌 룩북",
    image: IMAGES.lookbook,
    tag: "24FW 시그니처"
  },
  {
    id: "lb4",
    title: "Minimalist Modern Outer",
    subtitle: "견고한 실루엣과 테일러링이 조화로운 아우터",
    image: IMAGES.outer,
    tag: "프리미엄 아우터"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([1]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product, size = selectedSize) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeTab === 'all' || 
      (activeTab === 'outer' && product.category === 'Outer') ||
      (activeTab === 'lookbook' && product.category === 'Lookbook');
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Top Banner */}
      <div className="top-banner">
        <span>✨ 2024 AUTUMN / WINTER LUXE COLLECTION — 무이자 할부 혜택 &amp; 무료 배송 이벤트</span>
      </div>

      {/* Main Navigation Header */}
      <header className="header">
        <div className="header-inner">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="logo-brand">
            <span className="brand-sub">ATELIER &amp; BOUTIQUE</span>
            <h1 className="brand-title">NOIR &amp; BLANC</h1>
          </div>

          <nav className={`nav-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
            <a href="#hero" className="nav-link active">Home</a>
            <a href="#collection" className="nav-link">New Collection</a>
            <a href="#lookbook" className="nav-link">Lookbook</a>
            <a href="#products" className="nav-link">Shop Outer</a>
            <a href="#about" className="nav-link">Brand Story</a>
          </nav>

          <div className="header-actions">
            <div className="search-bar-wrap">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="검색어 입력 (자켓, 아우터, 룩북)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <button className="icon-btn" aria-label="위시리스트">
              <Heart size={20} />
              {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
            </button>

            <button className="icon-btn cart-btn" onClick={() => setIsCartOpen(true)} aria-label="장바구니">
              <ShoppingBag size={20} />
              {cart.length > 0 && <span className="badge">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-grid">
          <div className="hero-card hero-primary">
            <div className="hero-image-box">
              <img src={IMAGES.whiteJacketSide} alt="아웃룩 여성 데이트룩 화이트 자켓 측면" className="hero-img" />
              <div className="hero-overlay"></div>
            </div>
            <div className="hero-content">
              <span className="tag-hero"><Sparkles size={14} /> NEW ARRIVAL</span>
              <h2 className="hero-title">화이트 데이트룩 자켓</h2>
              <p className="hero-desc">측면에서 완성되는 섬세한 테일러드 핏. 여성스러운 드레이프와 정교한 라인업.</p>
              <div className="hero-btn-group">
                <button className="btn-primary" onClick={() => setSelectedProduct(PRODUCTS[0])}>
                  컬렉션 자세히 보기 <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="hero-side-grid">
            <div className="hero-card hero-secondary">
              <img src={IMAGES.whiteJacketStyling} alt="아웃룩 여성 데이트룩 화이트 자켓 스타일링" className="hero-img-secondary" />
              <div className="hero-side-overlay">
                <span className="badge-light">STYLING GUIDE</span>
                <h3>데이트룩 스타일링 매치</h3>
                <p>자연스러운 모던 센스와 톤온톤 연출</p>
                <button className="btn-text" onClick={() => setSelectedProduct(PRODUCTS[2])}>
                  스타일링 상품 보기 &gt;
                </button>
              </div>
            </div>

            <div className="hero-card hero-secondary">
              <img src={IMAGES.lookbook} alt="여성 룩북" className="hero-img-secondary" />
              <div className="hero-side-overlay">
                <span className="badge-light">LOOKBOOK</span>
                <h3>여성 프리미엄 룩북</h3>
                <p>2024 F/W 모던 클래식 감성</p>
                <a href="#lookbook" className="btn-text">룩북 화보 감상 &gt;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banner / Curated Outers */}
      <section id="collection" className="curated-section">
        <div className="section-container">
          <div className="curated-banner">
            <div className="curated-text">
              <span className="sub-label">24 F/W HIGHLIGHT</span>
              <h2>여성 아우터 &amp; 데이트룩 컬렉션</h2>
              <p>
                감각적인 실루엣과 고급 소재가 결합된 프렌치 센서빌리티 룩.
                완벽한 날을 위한 나만의 하이엔드 패션 스타일을 지금 확인해보세요.
              </p>
              <ul className="feature-list">
                <li><Check size={16} /> 프리미엄 화이트 테일러드 우븐 소재</li>
                <li><Check size={16} /> 입체 패턴 기반의 완벽한 핏 보정</li>
                <li><Check size={16} /> 시즌 한정 스페셜 패키징 제공</li>
              </ul>
              <a href="#products" className="btn-outline">스페셜 셀렉션 쇼핑하기</a>
            </div>
            <div className="curated-img-wrap">
              <img src={IMAGES.outer} alt="여성 아우터 컬렉션 메인" className="curated-img" />
              <div className="curated-tag-box">
                <span className="tag-title">Featured Outer</span>
                <span className="tag-price">₩ 245,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="products" className="products-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <span className="section-subtitle">OUR CURATED SELECTION</span>
              <h2 className="section-title">스페셜 패션 쇼핑몰 라인업</h2>
            </div>
            
            <div className="filter-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                전체보기
              </button>
              <button 
                className={`tab-btn ${activeTab === 'outer' ? 'active' : ''}`}
                onClick={() => setActiveTab('outer')}
              >
                아우터 / 자켓
              </button>
              <button 
                className={`tab-btn ${activeTab === 'lookbook' ? 'active' : ''}`}
                onClick={() => setActiveTab('lookbook')}
              >
                룩북 에디션
              </button>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-thumb-container">
                  <span className="product-badge">{product.tag}</span>
                  <button 
                    className={`fav-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="위시리스트 추가"
                  >
                    <Heart size={18} fill={favorites.includes(product.id) ? "#e63946" : "none"} color={favorites.includes(product.id) ? "#e63946" : "#111"} />
                  </button>
                  
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-img default-img" 
                  />
                  <img 
                    src={product.altImage} 
                    alt={`${product.name} 스타일 컷`} 
                    className="product-img hover-img" 
                  />

                  <div className="product-actions-overlay">
                    <button className="quick-btn" onClick={() => setSelectedProduct(product)}>
                      <Eye size={16} /> 상세보기
                    </button>
                    <button className="quick-btn primary" onClick={() => addToCart(product)}>
                      <ShoppingBag size={16} /> 담기
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <div className="rating-row">
                    <Star size={14} className="star-icon" fill="#ffb703" color="#ffb703" />
                    <span className="rating-num">{product.rating}</span>
                    <span className="reviews-count">({product.reviews})</span>
                  </div>
                  <h3 className="product-name" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                  <p className="product-desc-short">{product.description}</p>
                  
                  <div className="price-row">
                    <span className="price-current">₩ {product.price.toLocaleString()}</span>
                    <span className="price-original">₩ {product.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Visual Gallery */}
      <section id="lookbook" className="lookbook-section">
        <div className="section-container">
          <div className="lookbook-header text-center">
            <span className="section-subtitle">EDITORIAL GALLERY</span>
            <h2 className="section-title">2024 F/W 시그니처 룩북 화보</h2>
            <p className="section-desc">모던 레이디를 위한 4가지 차별화된 아웃룩 화보 비주얼</p>
          </div>

          <div className="lookbook-grid">
            {LOOKBOOK_ITEMS.map((item, idx) => (
              <div key={item.id} className={`lookbook-card lookbook-item-${idx + 1}`}>
                <div className="lookbook-img-box">
                  <img src={item.image} alt={item.title} className="lookbook-img" />
                  <div className="lookbook-overlay">
                    <span className="lookbook-tag">{item.tag}</span>
                    <h3 className="lookbook-title">{item.title}</h3>
                    <p className="lookbook-sub">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="about" className="brand-story-section">
        <div className="section-container">
          <div className="brand-story-grid">
            <div className="brand-story-images">
              <img src={IMAGES.whiteJacketSide} alt="브랜드 스튜디오 메인 자켓" className="story-img-main" />
              <img src={IMAGES.outer} alt="브랜드 스튜디오 아우터" className="story-img-sub" />
            </div>

            <div className="brand-story-content">
              <span className="sub-label">BRAND PHILOSOPHY</span>
              <h2>우아함과 절제미의 완성,<br />NOIR &amp; BLANC</h2>
              <p>
                우리는 유행을 좇지 않고 오랫동안 지녀도 아름다운 클래식 핏을 연구합니다.
                데이트룩의 유연한 부드러움과 테일러드 아우터의 단단한 구조감이 주는
                조화로운 실루엣을 경험하세요.
              </p>
              
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-lbl">Premium Fabric</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">4.9★</span>
                  <span className="stat-lbl">Customer Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">Lim.</span>
                  <span className="stat-lbl">Handmade Collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>NOIR &amp; BLANC</h3>
              <p>나만의 감각적인 프렌치 데이트룩 &amp; 룩북 아우터 패션 쇼핑몰</p>
              <div className="social-links">
                <a href="#instagram" aria-label="인스타그램"><Instagram size={20} /></a>
                <a href="#facebook" aria-label="페이스북"><Facebook size={20} /></a>
                <a href="#youtube" aria-label="유튜브"><Youtube size={20} /></a>
              </div>
            </div>

            <div className="footer-links-grid">
              <div className="footer-col">
                <h4>SHOP CATEGORY</h4>
                <ul>
                  <li><a href="#products">화이트 데이트룩 자켓</a></li>
                  <li><a href="#products">여성 아우터 컬렉션</a></li>
                  <li><a href="#lookbook">F/W 스페셜 룩북</a></li>
                  <li><a href="#products">시그니처 라인</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>CUSTOMER CARE</h4>
                <ul>
                  <li><a href="#faq">고객센터 1588-0000</a></li>
                  <li><a href="#shipping">배송 &amp; 반품 안내</a></li>
                  <li><a href="#size">사이즈 가이드</a></li>
                  <li><a href="#care">소재 케어 팁</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>ATELIER INFO</h4>
                <p>서울특별시 강남구 도산대로 45길</p>
                <p>사업자 등록번호: 123-45-67890</p>
                <p>통신판매업 신고번호: 2024-서울강남-0123</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 NOIR &amp; BLANC Couture. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <X size={24} />
            </button>

            <div className="modal-body">
              <div className="modal-gallery">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-main-img" />
                <div className="modal-thumbs">
                  <img src={selectedProduct.image} alt="측면" className="active" />
                  <img src={selectedProduct.altImage} alt="스타일링" />
                </div>
              </div>

              <div className="modal-details">
                <span className="modal-badge">{selectedProduct.tag}</span>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <div className="modal-price">
                  <span className="price-cur">₩ {selectedProduct.price.toLocaleString()}</span>
                  <span className="price-old">₩ {selectedProduct.originalPrice.toLocaleString()}</span>
                </div>

                <p className="modal-desc">{selectedProduct.description}</p>

                <div className="option-group">
                  <label>사이즈 (Size)</label>
                  <div className="size-options">
                    {selectedProduct.sizes.map(size => (
                      <button 
                        key={size} 
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-cart-large" onClick={() => {
                    addToCart(selectedProduct, selectedSize);
                    setSelectedProduct(null);
                  }}>
                    <ShoppingBag size={20} /> 장바구니 담기
                  </button>
                  <button 
                    className={`btn-fav-large ${favorites.includes(selectedProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(selectedProduct.id)}
                  >
                    <Heart size={20} fill={favorites.includes(selectedProduct.id) ? "#e63946" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer Slide */}
      {isCartOpen && (
        <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>장바구니 ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
              <button onClick={() => setIsCartOpen(false)}><X size={20} /></button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} />
                  <p>장바구니가 비어 있습니다.</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-thumb" />
                    <div className="cart-info">
                      <h4>{item.name}</h4>
                      <p className="cart-opt">사이즈: {item.size} | 수량: {item.quantity}</p>
                      <span className="cart-price">₩ {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(index)}>
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>총 결제금액</span>
                  <strong>₩ {totalCartPrice.toLocaleString()}</strong>
                </div>
                <button className="btn-checkout" onClick={() => alert('주문 페이지로 이동합니다 (데모)')}>
                  주문하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
