import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  Bot,
  Send,
  Star,
  ArrowRight,
  RefreshCw,
  Gift,
  ShieldCheck,
  Truck,
  ChevronRight,
  X,
  User,
  Calendar,
  Zap,
  Check,
  Heart,
  HelpCircle,
  Menu,
  CheckCircle2,
  Sliders,
  Filter,
  Eye,
  Award,
  Layers,
  ThumbsUp,
  Clock
} from 'lucide-react';

// Sample Curated Boxes Data
const BOXES_DATA = [
  {
    id: 'box-1',
    title: 'K-Modern Silhouette & Essential Wardrobe',
    category: 'fashion',
    categoryLabel: '패션 · 모던 에센셜',
    matchScore: 98,
    price: 69000,
    originalPrice: 110000,
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1794556017527',
    tagline: '알고리즘이 분석한 2030 트렌드 모던 실루엣과 감각적인 데일리 레이어드 스타일',
    description: '가장 한국적이면서도 감각적인 모던 룩을 완성해 드립니다. 체형 알고리즘과 시즌 컬러 매칭으로 엄선된 프리미엄 텍스타일 니트, 와이드 드레이프 파츠 및 미니멀 오프닝 액세서리로 구성됩니다.',
    items: [
      '모던 실루엣 드레이프 블라우스 / 셔츠',
      '미니멀 레더 카드 홀더 & 핀 케이스',
      'AI 퍼스널 컬러 매칭 가이드 북',
      '시즌 어울림 실크 스카프'
    ],
    reviewsCount: 342,
    rating: 4.9,
    badge: 'BEST AI MATCH'
  },
  {
    id: 'box-2',
    title: 'Airy Linen & Natural Organic Textile',
    category: 'living',
    categoryLabel: '리빙 · 에어리 린넨',
    matchScore: 96,
    price: 59000,
    originalPrice: 95000,
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1793853023363',
    tagline: '바람에 나부끼는 에어리한 화이트 린넨과 계절을 담은 유기농 리빙 라이프',
    description: '공간의 텍스처를 바꿉니다. 통기성과 미학을 조화시킨 최고급 유기농 린넨 테이블 클로스, 패브릭 스프레이, 실내 디퓨저를 AI 공간 맞춤 로직으로 조합합니다.',
    items: [
      '프리미엄 100% 에어리 화이트 린넨 드레이프 클로스',
      '자연 침엽수 & 백합 추출 룸 스프레이 (100ml)',
      '핸드메이드 패브릭 코스터 4종 세트',
      'AI 공간 스티어링 가이드'
    ],
    reviewsCount: 289,
    rating: 4.85,
    badge: 'SEASONAL EDITION'
  },
  {
    id: 'box-3',
    title: 'Seasonal Artisanal Handmade Candle Edition',
    category: 'candle',
    categoryLabel: '라이프스타일 · 프리미엄 캔들',
    matchScore: 99,
    price: 49000,
    originalPrice: 78000,
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/external_847921eb0197a4db685aeeea63ba6a9d47f36ce8cad110b9dd7b1797437b8116',
    tagline: '계절의 온도를 담아 손으로 빚은 소이 캔들과 힐링 아로마',
    description: '당신의 퇴근 후 밤을 완성하는 아로마 테라피. 식물성 천연 왁스와 프랑스 조향 스튜디오에서 수입한 프리미엄 향료로 제작되어, 생체 리듬 분석에 맞춰 달마다 전달됩니다.',
    items: [
      '시즌 핸드메이드 보타니컬 천연 캔들 (300g)',
      '브라스 스너퍼 & 매치 세트',
      '마인드풀니스 AI 힐링 트랙 QR카드',
      '천연 시더우드 트레이'
    ],
    reviewsCount: 512,
    rating: 4.95,
    badge: 'MOST POPULAR'
  },
  {
    id: 'box-4',
    title: 'Pure Bottle Personalized Daily Wellness Pack',
    category: 'wellness',
    categoryLabel: '웰니스 · 맞춤 영양 캡슐',
    matchScore: 97,
    price: 55000,
    originalPrice: 88000,
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/external_15b8a8e49a3dd1e67ad5fb4ed67f3bb7e051e75b81143e465622d6973e7db06f',
    tagline: '밝고 깨끗한 투명 비틀의 바이탈 케어와 신선한 그린 웰니스 리뉴얼',
    description: '수면, 스트레스, 피부 생기, 에너지 지표를 AI가 매달 측정해 맞춤 조합하는 1등 웰니스 캡슐 키트. 깨끗하게 추출된 고함량 오가닉 콤플렉스로 가득 채워집니다.',
    items: [
      '투명 보틀 프리미엄 30일 바이탈 캡슐 세트',
      '신선한 천연 그린 클렌즈 포르테 팩',
      '휴대용 비건 레더 영양제 파우치',
      'AI 바이오리듬 맞춤 가이드라인'
    ],
    reviewsCount: 418,
    rating: 4.91,
    badge: 'AI CARE TOP'
  }
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: '김서연 님',
    tag: '패션 & 모던 에센셜 구독자',
    text: '내 분위기와 피부톤에 딱 맞는 옷과 소품을 알아서 보내주니까 코디 고민이 완전히 사라졌어요! 이번 화보 콘셉트 룩 박스는 완전히 취향저격입니다.',
    rating: 5,
    date: '2025.02.20',
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1794556017527'
  },
  {
    id: 2,
    name: '이도현 님',
    tag: '리빙 & 패브릭 2년 차 구독자',
    text: '린넨 감촉이 미쳤습니다. 방에 거는 순간 집안 전체의 바람 느낌과 기분이 화사하게 달라졌어요. AI 공간 추천 알고리즘 진짜 신기하네요.',
    rating: 5,
    date: '2025.02.18',
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1793853023363'
  },
  {
    id: 3,
    name: '박유진 님',
    tag: '프리미엄 캔들 매월 배송',
    text: '계절이 바뀔 때마다 그 계절에 맞는 향의 핸드메이드 캔들이 도착해요. 이번 달 은은한 우디와 플로럴 향이 피로를 한 번에 녹여줍니다.',
    rating: 5,
    date: '2025.02.15',
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/external_847921eb0197a4db685aeeea63ba6a9d47f36ce8cad110b9dd7b1797437b8116'
  },
  {
    id: 4,
    name: '정민아 님',
    tag: '맞춤 웰니스 캡슐 구독자',
    text: '투명 유리에 들어있는 비타민들이 너무 예쁘고 깔끔해요! 제 스트레스 지수와 피로도 진단 결과대로 영양 조합이 바뀌어서 배송되니 대만족입니다.',
    rating: 5,
    date: '2025.02.10',
    image: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/external_15b8a8e49a3dd1e67ad5fb4ed67f3bb7e051e75b81143e465622d6973e7db06f'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, boxes, quiz, plans, reviews
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([BOXES_DATA[0]]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBoxModal, setSelectedBoxModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Subscription cycle states
  const [planCycle, setPlanCycle] = useState('monthly'); // monthly, quarterly
  const [selectedTier, setSelectedTier] = useState('signature');

  // AI Quiz States
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    category: 'fashion',
    mood: 'minimal',
    budget: 'mid',
    frequency: 'monthly'
  });
  const [quizAnalyzing, setQuizAnalyzing] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // AI Chat Stylist Drawer States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: '반갑습니다! CURATE:AI 퍼스널 큐레이터입니다. 라이프스타일, 패션, 홈케어, 웰니스에 대해 원하는 분위기나 고민을 편하게 말씀해 주세요.',
      time: '방금'
    }
  ]);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (box) => {
    if (!cartItems.find(item => item.id === box.id)) {
      setCartItems([...cartItems, box]);
      showToast(`'${box.title}' 상품이 구독함에 담겼습니다.`);
    } else {
      showToast('이미 구독함에 등록된 상자입니다.');
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    showToast('구독함에서 삭제되었습니다.');
  };

  const handleStartQuiz = () => {
    setIsQuizOpen(true);
    setQuizStep(1);
    setQuizResult(null);
  };

  const handleQuizNext = () => {
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      // Analyze
      setQuizAnalyzing(true);
      setTimeout(() => {
        setQuizAnalyzing(false);
        setQuizStep(4);
        // Find best match based on category
        const matched = BOXES_DATA.find(b => b.category === quizAnswers.category) || BOXES_DATA[0];
        setQuizResult({
          matchBox: matched,
          score: 99.2,
          tags: [
            quizAnswers.mood === 'minimal' ? '모던 미니멀' : '내추럴 오가닉',
            quizAnswers.category === 'fashion' ? 'K-패션 트렌드' : '프리미엄 세스',
            '퍼스널 메이드'
          ],
          summary: `당신의 취향 분석 결과: ${quizAnswers.mood.toUpperCase()} 스타일과 ${quizAnswers.category.toUpperCase()} 큐레이션이 99.2%의 적합도를 보입니다.`
        });
      }, 1500);
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let aiText = '';
      if (query.includes('패션') || query.includes('옷') || query.includes('출근')) {
        aiText = '2030 한국 여성 스타일 알고리즘을 적용한 [K-Modern Silhouette & Essential Wardrobe] 박스를 제안해 드립니다. 깔끔한 레이어드 룩과 고급 텍스타일 소품이 조화를 이룹니다.';
      } else if (query.includes('향') || query.includes('캔들') || query.includes('아로마')) {
        aiText = '피로 회복과 아늑한 공간을 위해 [Seasonal Artisanal Handmade Candle Edition]을 강력 추천합니다. 100% 식물성 소이 왁스와 프랑스산 프리미엄 아로마가 포함됩니다.';
      } else if (query.includes('영양제') || query.includes('웰니스') || query.includes('피부')) {
        aiText = '투명 유리병에 담긴 clean & pure 바이탈 케어 [Pure Bottle Personalized Daily Wellness Pack]이 적합합니다. 고객님의 바이오리듬과 생활습관에 맞춘 오가닉 조합입니다.';
      } else {
        aiText = `"${query}"에 맞춰 AI 신경망이 선별한 큐레이션 박스를 추천합니다. 맞춤 진단을 완료하시면 더 섬세한 취향 파라미터가 적용됩니다.`;
      }
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 900);
  };

  const filteredBoxes = selectedCategory === 'all'
    ? BOXES_DATA
    : BOXES_DATA.filter(b => b.category === selectedCategory);

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <Sparkles className="icon-sparkle" size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Navigation */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-area" onClick={() => setActiveTab('home')}>
            <div className="logo-icon">
              <Sparkles size={20} />
            </div>
            <span className="logo-text">CURATE<span className="logo-accent">:AI</span></span>
          </div>

          <nav className="desktop-nav">
            <button
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              홈
            </button>
            <button
              className={`nav-link ${activeTab === 'boxes' ? 'active' : ''}`}
              onClick={() => setActiveTab('boxes')}
            >
              큐레이션 박스
            </button>
            <button
              className={`nav-link ${activeTab === 'plans' ? 'active' : ''}`}
              onClick={() => setActiveTab('plans')}
            >
              구독 플랜
            </button>
            <button
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              구독 후기
            </button>
          </nav>

          <div className="header-actions">
            <button className="btn-quiz-shortcut" onClick={handleStartQuiz}>
              <Sliders size={16} />
              <span>AI 맞춤 진단</span>
            </button>

            <button className="btn-chat-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
              <Bot size={18} />
              <span className="chat-badge-dot"></span>
            </button>

            <button className="btn-cart-toggle" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={18} />
              {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            </button>

            <button className="btn-mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>홈</button>
            <button onClick={() => { setActiveTab('boxes'); setMobileMenuOpen(false); }}>큐레이션 박스</button>
            <button onClick={() => { setActiveTab('plans'); setMobileMenuOpen(false); }}>구독 플랜</button>
            <button onClick={() => { setActiveTab('reviews'); setMobileMenuOpen(false); }}>구독 후기</button>
            <button className="mobile-quiz-btn" onClick={() => { setMobileMenuOpen(false); handleStartQuiz(); }}>
              AI 스타일 진단 시작
            </button>
          </div>
        )}
      </header>

      {/* Main Content Areas */}
      <main className="main-content">
        {/* HERO SECTION (Visible when tab is 'home') */}
        {activeTab === 'home' && (
          <>
            <section className="hero-section">
              <div className="hero-grid">
                <div className="hero-text-content">
                  <div className="hero-badge">
                    <Sparkles size={14} />
                    <span>AI-POWERED PERSONAL CURATION SERVICE</span>
                  </div>
                  <h1 className="hero-title">
                    당신의 취향을 알아채는<br />
                    <span className="hero-highlight">AI 맞춤 쇼핑 구독</span>
                  </h1>
                  <p className="hero-description">
                    패션, 에어리 린넨 패브릭, 프리미엄 핸드메이드 캔들, 청정한 오가닉 웰니스 캡슐까지.<br />
                    알고리즘이 매달 정밀 분석하여 당신의 공간과 스타일에 꼭 맞는 구독 상자를 선별해 배송합니다.
                  </p>
                  <div className="hero-cta-group">
                    <button className="btn-primary-hero" onClick={handleStartQuiz}>
                      <span>AI 취향 진단받기 (30초)</span>
                      <ArrowRight size={18} />
                    </button>
                    <button className="btn-secondary-hero" onClick={() => setActiveTab('boxes')}>
                      <span>이달의 큐레이션 구경하기</span>
                    </button>
                  </div>

                  <div className="hero-stats">
                    <div className="stat-item">
                      <div className="stat-num">98.4%</div>
                      <div className="stat-lbl">AI 취향 일치율</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <div className="stat-num">48,200+</div>
                      <div className="stat-lbl">누적 구독 상자 배송</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <div className="stat-num">4.9 / 5.0</div>
                      <div className="stat-lbl">고객 구독 만족도</div>
                    </div>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="hero-card-featured">
                    <div className="featured-img-wrap">
                      <img
                        src="https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1794556017527"
                        alt="K-Fashion AI Curation Woman"
                        className="hero-main-img"
                      />
                      <div className="hero-overlay-tag">
                        <Sparkles size={14} />
                        <span>AI Match 98%</span>
                      </div>
                    </div>
                    <div className="featured-info">
                      <div className="featured-cat">THIS MONTH'S TOP AI PICK</div>
                      <h3 className="featured-name">K-Modern Silhouette & Essential Wardrobe</h3>
                      <p className="featured-sub">20대 한국 여성 최신 패션 분석 알고리즘 기반</p>
                      <button className="btn-featured-action" onClick={() => setSelectedBoxModal(BOXES_DATA[0])}>
                        상세보기 및 구독 구성 보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Feature Highlights Grid */}
            <section className="feature-cards-section">
              <div className="section-header center">
                <span className="section-sub">WHY CURATE:AI</span>
                <h2 className="section-title">AI 쇼핑 구독이 만드는 일상의 변화</h2>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon"><Zap size={24} /></div>
                  <h3>개인화 알고리즘</h3>
                  <p>구매 내역과 스타일 진단 데이터로 매월 시시각각 변화하는 계절과 취향을 정확히 반영합니다.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><Award size={24} /></div>
                  <h3>프리미엄 퀄리티 엄선</h3>
                  <p>전문 큐레이터와 AI가 100여 개 럭셔리 브랜드 및 검증된 공방 제품만을 깐깐하게 피킹합니다.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><RefreshCw size={24} /></div>
                  <h3>자유로운 구독 컨트롤</h3>
                  <p>필요에 따라 쉬어가기, 카테고리 교체, 배송 주기 변경을 클릭 한 번으로 간편하게 관리합니다.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><ShieldCheck size={24} /></div>
                  <h3>100% 만족 보장</h3>
                  <p>AI 매칭 추천이 마음에 들지 않을 경우, 교환 및 무료 리큐레이션 서비스를 제공합니다.</p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* BOXES SHOWCASE SECTION */}
        {(activeTab === 'home' || activeTab === 'boxes') && (
          <section className="boxes-showcase-section">
            <div className="section-header">
              <div>
                <span className="section-sub">CURATED SELECTION</span>
                <h2 className="section-title">이달의 맞춤 큐레이션 박스</h2>
              </div>
              {activeTab === 'home' && (
                <button className="btn-link" onClick={() => setActiveTab('boxes')}>
                  전체 큐레이션 보기 <ChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="category-tabs">
              <button
                className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                전체 카테고리
              </button>
              <button
                className={`tab-btn ${selectedCategory === 'fashion' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('fashion')}
              >
                패션 · 에센셜
              </button>
              <button
                className={`tab-btn ${selectedCategory === 'living' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('living')}
              >
                리빙 · 린넨
              </button>
              <button
                className={`tab-btn ${selectedCategory === 'candle' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('candle')}
              >
                핸드메이드 캔들
              </button>
              <button
                className={`tab-btn ${selectedCategory === 'wellness' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('wellness')}
              >
                웰니스 · 영양제
              </button>
            </div>

            {/* Products Grid */}
            <div className="boxes-grid">
              {filteredBoxes.map((box) => (
                <div key={box.id} className="box-card">
                  <div className="box-img-container">
                    <img src={box.image} alt={box.title} className="box-img" />
                    <span className="box-badge">{box.badge}</span>
                    <button className="btn-quick-view" onClick={() => setSelectedBoxModal(box)}>
                      <Eye size={16} /> 빠른 보기
                    </button>
                  </div>
                  <div className="box-card-content">
                    <div className="box-meta">
                      <span className="box-cat-label">{box.categoryLabel}</span>
                      <span className="box-match-score">
                        <Sparkles size={12} /> AI 매칭 {box.matchScore}%
                      </span>
                    </div>
                    <h3 className="box-title">{box.title}</h3>
                    <p className="box-tagline">{box.tagline}</p>

                    <div className="box-price-row">
                      <div className="price-group">
                        <span className="original-price">{box.originalPrice.toLocaleString()}원</span>
                        <span className="current-price">{box.price.toLocaleString()}원<span className="month-unit">/월</span></span>
                      </div>
                      <div className="rating-info">
                        <Star size={14} fill="#F59E0B" color="#F59E0B" />
                        <span>{box.rating} ({box.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="box-card-actions">
                      <button className="btn-add-cart" onClick={() => addToCart(box)}>
                        <ShoppingBag size={16} /> 구독함에 담기
                      </button>
                      <button className="btn-detail" onClick={() => setSelectedBoxModal(box)}>
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SUBSCRIPTION PLANS SECTION */}
        {(activeTab === 'home' || activeTab === 'plans') && (
          <section className="plans-section">
            <div className="section-header center">
              <span className="section-sub">MEMBERSHIP PLANS</span>
              <h2 className="section-title">나에게 딱 맞는 구독 멤버십 선택</h2>
              <p className="section-desc">모든 플랜에 AI 맞춤 취향 추천 서비스 및 무료 배송 혜택이 적용됩니다.</p>
            </div>

            <div className="cycle-toggle-wrap">
              <button
                className={`cycle-btn ${planCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setPlanCycle('monthly')}
              >
                월간 결제
              </button>
              <button
                className={`cycle-btn ${planCycle === 'quarterly' ? 'active' : ''}`}
                onClick={() => setPlanCycle('quarterly')}
              >
                분기 결제 (15% 할인 + AI 패밀리 케어)
              </button>
            </div>

            <div className="plans-grid">
              {/* Plan 1 */}
              <div className={`plan-card ${selectedTier === 'starter' ? 'selected' : ''}`}>
                <div className="plan-header">
                  <h3>Starter Box</h3>
                  <p>1개 테마 집중 큐레이션</p>
                  <div className="plan-price">
                    <span className="amount">
                      {planCycle === 'monthly' ? '49,000' : '41,600'}
                    </span>
                    <span className="unit">원 / 월</span>
                  </div>
                </div>
                <ul className="plan-features">
                  <li><Check size={16} /> 선택 1개 카테고리 매월 큐레이션</li>
                  <li><Check size={16} /> 기본 AI 취향 분석 및 업데이트</li>
                  <li><Check size={16} /> 무상 배송 & 언제든 일시정지</li>
                  <li><Check size={16} /> 전용 파우치 패키징</li>
                </ul>
                <button
                  className={`btn-plan-select ${selectedTier === 'starter' ? 'active' : ''}`}
                  onClick={() => { setSelectedTier('starter'); showToast('Starter 플랜이 선택되었습니다.'); }}
                >
                  {selectedTier === 'starter' ? '선택됨' : 'Starter 시작하기'}
                </button>
              </div>

              {/* Plan 2 - Popular */}
              <div className={`plan-card popular ${selectedTier === 'signature' ? 'selected' : ''}`}>
                <div className="popular-badge">MOST POPULAR</div>
                <div className="plan-header">
                  <h3>Signature AI Box</h3>
                  <p>패션 + 리빙/웰니스 통합 큐레이션</p>
                  <div className="plan-price">
                    <span className="amount">
                      {planCycle === 'monthly' ? '79,000' : '67,100'}
                    </span>
                    <span className="unit">원 / 월</span>
                  </div>
                </div>
                <ul className="plan-features">
                  <li><Check size={16} /> 2개 메인 카테고리 믹스 매치</li>
                  <li><Check size={16} /> 고도화 AI 1:1 퍼스널 코칭 서비스</li>
                  <li><Check size={16} /> 시즌 한정판 핸드메이드 굿즈 제공</li>
                  <li><Check size={16} /> 무료 반품 & 리큐레이션 혜택</li>
                  <li><Check size={16} /> AI 실시간 스타일리스트 이용</li>
                </ul>
                <button
                  className={`btn-plan-select popular-btn ${selectedTier === 'signature' ? 'active' : ''}`}
                  onClick={() => { setSelectedTier('signature'); showToast('Signature 플랜이 선택되었습니다.'); }}
                >
                  {selectedTier === 'signature' ? '선택됨' : 'Signature 시작하기'}
                </button>
              </div>

              {/* Plan 3 */}
              <div className={`plan-card ${selectedTier === 'vip' ? 'selected' : ''}`}>
                <div className="plan-header">
                  <h3>VIP Atelier All-In-One</h3>
                  <p>전 카테고리 풀 럭셔리 케어</p>
                  <div className="plan-price">
                    <span className="amount">
                      {planCycle === 'monthly' ? '129,000' : '109,600'}
                    </span>
                    <span className="unit">원 / 월</span>
                  </div>
                </div>
                <ul className="plan-features">
                  <li><Check size={16} /> 패션+린넨+캔들+웰니스 4종 풀 패키지</li>
                  <li><Check size={16} /> 전담 럭셔리 퍼스널 큐레이터 배정</li>
                  <li><Check size={16} /> 시크릿 신제품 런칭 전 선제공</li>
                  <li><Check size={16} /> 커스텀 각인 선물 포장 서비스</li>
                </ul>
                <button
                  className={`btn-plan-select ${selectedTier === 'vip' ? 'active' : ''}`}
                  onClick={() => { setSelectedTier('vip'); showToast('VIP Atelier 플랜이 선택되었습니다.'); }}
                >
                  {selectedTier === 'vip' ? '선택됨' : 'VIP 시작하기'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* REVIEWS SECTION */}
        {(activeTab === 'home' || activeTab === 'reviews') && (
          <section className="reviews-section">
            <div className="section-header center">
              <span className="section-sub">SUBSCRIBER REVIEWS</span>
              <h2 className="section-title">구독자가 말하는 CURATE:AI 체엄</h2>
            </div>

            <div className="reviews-grid">
              {REVIEWS_DATA.map((rev) => (
                <div key={rev.id} className="review-card">
                  <div className="review-header">
                    <img src={rev.image} alt={rev.name} className="review-avatar" />
                    <div>
                      <h4 className="review-author">{rev.name}</h4>
                      <span className="review-tag">{rev.tag}</span>
                    </div>
                  </div>
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                    <span className="review-date">{rev.date}</span>
                  </div>
                  <p className="review-text">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-area">
              <Sparkles size={20} />
              <span className="logo-text">CURATE<span className="logo-accent">:AI</span></span>
            </div>
            <p className="footer-desc">
              AI 기술과 인공지능 알고리즘으로 당신의 패션, 리빙, 아로마 캔들, 웰니스를 온전히 큐레이션하는 프리미엄 구독 브랜드.
            </p>
            <p className="footer-copy">© 2025 CURATE:AI Inc. All rights reserved.</p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>서비스 안내</h4>
              <a>AI 스타일 진단</a>
              <a>이달의 큐레이션</a>
              <a>구독 플랜 안내</a>
              <a>구독자 갤러리</a>
            </div>
            <div className="footer-col">
              <h4>고객지원</h4>
              <a>공지사항</a>
              <a>자주 묻는 질문</a>
              <a>1:1 AI 상담소</a>
              <a>배송/환불 정책</a>
            </div>
            <div className="footer-col">
              <h4>카테고리</h4>
              <a>패션 · 에센셜</a>
              <a>리빙 · 린넨</a>
              <a>핸드메이드 캔들</a>
              <a>웰니스 · 영양제</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI CHATBOT DRAWER */}
      {isChatOpen && (
        <div className="chat-drawer-overlay" onClick={() => setIsChatOpen(false)}>
          <div className="chat-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <div className="chat-header-title">
                <Bot size={20} className="ai-bot-icon" />
                <div>
                  <h3>CURATE AI Stylist</h3>
                  <span className="online-status">● Real-time AI Assistant</span>
                </div>
              </div>
              <button className="btn-close" onClick={() => setIsChatOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="chat-body">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.sender}`}>
                  {msg.sender === 'ai' && (
                    <div className="chat-avatar">
                      <Sparkles size={14} />
                    </div>
                  )}
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            <div className="chat-quick-prompts">
              <button onClick={() => handleSendMessage('20대 여성에게 추천하는 이달의 패션 박스는?')}>
                # 패션 추천
              </button>
              <button onClick={() => handleSendMessage('화이트 린넨 패브릭 제품 상세 정보')}>
                # 에어리 린넨
              </button>
              <button onClick={() => handleSendMessage('아늑한 밤을 위한 프리미엄 캔들 추천')}>
                # 캔들 아로마
              </button>
              <button onClick={() => handleSendMessage('투명 유리병 영양제 케어 박스')}>
                # 맞춤 웰니스
              </button>
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="취향이나 고민을 적어주세요 (예: 린넨 소재 홈데코 추천)"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="btn-send" onClick={() => handleSendMessage()}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART & MY SUBSCRIPTION DRAWER */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>내 구독함 ({cartItems.length})</h3>
              <button className="btn-close" onClick={() => setIsCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cart-body">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} />
                  <p>구독함이 비어있습니다.</p>
                  <button className="btn-primary-hero" onClick={() => { setIsCartOpen(false); setActiveTab('boxes'); }}>
                    큐레이션 박스 둘러보기
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-details">
                      <span className="cart-cat">{item.categoryLabel}</span>
                      <h4>{item.title}</h4>
                      <div className="cart-price">{item.price.toLocaleString()}원 / 월</div>
                    </div>
                    <button className="btn-remove-item" onClick={() => removeFromCart(item.id)}>
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>총 월 구독 금액:</span>
                  <span className="total-price">
                    {cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}원 / 월
                  </span>
                </div>
                <button
                  className="btn-checkout"
                  onClick={() => {
                    showToast('구독 신청이 성공적으로 완료되었습니다! 첫 배송일을 안내드립니다.');
                    setIsCartOpen(false);
                  }}
                >
                  구독 시작하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW / DETAIL MODAL */}
      {selectedBoxModal && (
        <div className="modal-overlay" onClick={() => setSelectedBoxModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBoxModal(null)}>
              <X size={20} />
            </button>

            <div className="modal-grid">
              <div className="modal-img-wrap">
                <img src={selectedBoxModal.image} alt={selectedBoxModal.title} className="modal-img" />
                <div className="modal-match-tag">
                  <Sparkles size={14} /> AI 적합률 {selectedBoxModal.matchScore}%
                </div>
              </div>

              <div className="modal-content">
                <span className="modal-cat-badge">{selectedBoxModal.categoryLabel}</span>
                <h2 className="modal-title">{selectedBoxModal.title}</h2>
                <p className="modal-desc">{selectedBoxModal.description}</p>

                <div className="modal-box-items">
                  <h4><CheckCircle2 size={16} /> 구성 품목 리스트</h4>
                  <ul>
                    {selectedBoxModal.items.map((it, idx) => (
                      <li key={idx}><ChevronRight size={14} /> {it}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-price-bar">
                  <div>
                    <span className="old">{selectedBoxModal.originalPrice.toLocaleString()}원</span>
                    <span className="now">{selectedBoxModal.price.toLocaleString()}원<span className="unit">/월</span></span>
                  </div>
                  <button
                    className="btn-modal-subscribe"
                    onClick={() => {
                      addToCart(selectedBoxModal);
                      setSelectedBoxModal(null);
                    }}
                  >
                    이 상자로 구독 시작
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI STYLE QUIZ MODAL */}
      {isQuizOpen && (
        <div className="modal-overlay" onClick={() => setIsQuizOpen(false)}>
          <div className="quiz-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsQuizOpen(false)}>
              <X size={20} />
            </button>

            {quizAnalyzing ? (
              <div className="quiz-analyzing-state">
                <RefreshCw size={48} className="spin-icon" />
                <h3>AI 알고리즘 분석 중...</h3>
                <p>고객님의 취향 키워드, 카테고리선호도, 라이프스타일을 종합 매칭하고 있습니다.</p>
              </div>
            ) : quizStep < 4 ? (
              <div className="quiz-step-container">
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: `${(quizStep / 3) * 100}%` }}></div>
                </div>
                <div className="quiz-step-header">
                  <span className="quiz-step-num">STEP 0{quizStep} / 03</span>
                  {quizStep === 1 && <h2>관심 있는 카테고리를 선택해 주세요</h2>}
                  {quizStep === 2 && <h2>선호하는 라이프 무드와 감성은 어떤가요?</h2>}
                  {quizStep === 3 && <h2>희망하는 배송 주기 및 예산 범위를 정해주세요</h2>}
                </div>

                {/* Step 1 */}
                {quizStep === 1 && (
                  <div className="quiz-options-grid">
                    <button
                      className={`quiz-option-btn ${quizAnswers.category === 'fashion' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, category: 'fashion' })}
                    >
                      <div className="opt-title">패션 & 모던 에센셜</div>
                      <p>K-트렌드 2030 모던 실루엣과 감각적인 스타일</p>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.category === 'living' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, category: 'living' })}
                    >
                      <div className="opt-title">리빙 & 에어리 린넨</div>
                      <p>공간을 깨끗하고 부드럽게 감싸는 패브릭 오브제</p>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.category === 'candle' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, category: 'candle' })}
                    >
                      <div className="opt-title">핸드메이드 프리미엄 캔들</div>
                      <p>계절의 아로마 향을 담은 핸드크래프트 아로마</p>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.category === 'wellness' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, category: 'wellness' })}
                    >
                      <div className="opt-title">맞춤 영양 & 웰니스 캡슐</div>
                      <p>투명 유리병의 바이탈 생기 케어 및 클렌즈 팩</p>
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {quizStep === 2 && (
                  <div className="quiz-options-grid">
                    <button
                      className={`quiz-option-btn ${quizAnswers.mood === 'minimal' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, mood: 'minimal' })}
                    >
                      <div className="opt-title">미니멀 & 모던</div>
                      <p>깔끔한 라인, 절제된 색감, 세련된 실루엣</p>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.mood === 'natural' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, mood: 'natural' })}
                    >
                      <div className="opt-title">내추럴 & 에어리 오가닉</div>
                      <p>자연의 텍스처, 화이트 린넨, 편안하고 힐링되는 느낌</p>
                    </button>
                  </div>
                )}

                {/* Step 3 */}
                {quizStep === 3 && (
                  <div className="quiz-options-grid">
                    <button
                      className={`quiz-option-btn ${quizAnswers.budget === 'mid' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, budget: 'mid' })}
                    >
                      <div className="opt-title">실속 매월 구독 (4~6만 원대)</div>
                      <p>알찬 핵심 알짜 아이템 큐레이션</p>
                    </button>
                    <button
                      className={`quiz-option-btn ${quizAnswers.budget === 'high' ? 'selected' : ''}`}
                      onClick={() => setQuizAnswers({ ...quizAnswers, budget: 'high' })}
                    >
                      <div className="opt-title">프리미엄 럭셔리 (7~12만 원대)</div>
                      <p>최상위 브랜드 풀 세트 및 특별 사은품</p>
                    </button>
                  </div>
                )}

                <div className="quiz-footer-actions">
                  {quizStep > 1 && (
                    <button className="btn-quiz-back" onClick={() => setQuizStep(quizStep - 1)}>
                      이전
                    </button>
                  )}
                  <button className="btn-quiz-next" onClick={handleQuizNext}>
                    {quizStep === 3 ? 'AI 진단 결과 보기' : '다음 단계'}
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Result Step 4 */
              <div className="quiz-result-container">
                <div className="quiz-result-header">
                  <div className="result-badge">
                    <Sparkles size={16} /> PERFECT MATCH
                  </div>
                  <h2>AI 퍼스널 매칭 완결!</h2>
                  <p className="quiz-score-num">적합도: <span>{quizResult.score}%</span></p>
                </div>

                {quizResult.matchBox && (
                  <div className="result-card-preview">
                    <img src={quizResult.matchBox.image} alt={quizResult.matchBox.title} className="result-img" />
                    <div className="result-info">
                      <span className="cat">{quizResult.matchBox.categoryLabel}</span>
                      <h3>{quizResult.matchBox.title}</h3>
                      <p>{quizResult.matchBox.tagline}</p>
                      <div className="result-tags">
                        {quizResult.tags.map((t, idx) => (
                          <span key={idx} className="rt-tag">#{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="quiz-result-actions">
                  <button
                    className="btn-primary-hero"
                    onClick={() => {
                      addToCart(quizResult.matchBox);
                      setIsQuizOpen(false);
                    }}
                  >
                    추천 상자 바로 구독하기
                  </button>
                  <button className="btn-secondary-hero" onClick={() => setIsQuizOpen(false)}>
                    결과 닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
