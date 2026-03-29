import { useState, useEffect } from "react";
import truffle from "../assets/tuffle.jpg";
import steak from "../assets/wague-steak.jpg";
import butterchicken from "../assets/butter-chicken.jpg";
import dragonroll from "../assets/dragon-roll.jpg";
import mezze from "../assets/mezze-patter.jpg";
import creme from "../assets/creme-bruele.jpg";
import restaurant from "../assets/restaurant.jpg";

const dishes = [
  { id: 1, name: "Truffle Risotto", price: "₹1,299", category: "Italian", desc: "Creamy Arborio rice with black truffle shavings and aged Parmigiano", image: truffle, tag: "Chef's Pick", color: "#c8a96e" },
  { id: 2, name: "Butter Chicken", price: "₹649", category: "Indian", desc: "Slow-cooked tender chicken in a velvety tomato-cream masala sauce", image: butterchicken, tag: "Bestseller", color: "#e07b39" },
  { id: 3, name: "Dragon Roll", price: "₹899", category: "Japanese", desc: "Tempura prawn, avocado, cucumber topped with spicy tuna", image: dragonroll, tag: "New", color: "#4a9e7f" },
  { id: 4, name: "Wagyu Steak", price: "₹3,499", category: "Continental", desc: "A5 Japanese Wagyu with truffle butter and roasted bone marrow", image: steak, tag: "Premium", color: "#b34a4a" },
  { id: 5, name: "Mezze Platter", price: "₹749", category: "Mediterranean", desc: "Hummus, baba ghanoush, falafel, pita, olives & tabbouleh", image: mezze, tag: "Veg", color: "#7a6db5" },
  { id: 6, name: "Crème Brûlée", price: "₹449", category: "Dessert", desc: "Classic French vanilla custard with a perfectly caramelised sugar crust", image: creme, tag: "Must Try", color: "#c4a052" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Food Blogger", text: "Absolutely divine experience. The Wagyu Steak melted like a dream. Will return every weekend!", rating: 5, avatar: "PS" },
  { name: "Arjun Mehta", role: "Business Executive", text: "Perfect ambience for corporate dinners. The truffle risotto is simply unforgettable.", rating: 5, avatar: "AM" },
  { name: "Sneha Rao", role: "Travel Enthusiast", text: "Best hotel dining I've experienced in Hyderabad. Every dish tells a story.", rating: 5, avatar: "SR" },
];

const stats = [
  { number: "12+", label: "Years of Excellence" },
  { number: "250+", label: "Signature Dishes" },
  { number: "50K+", label: "Happy Guests" },
  { number: "18", label: "Awards Won" },
];

export default function HomepageResp() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Lock body scroll when cart or menu is open
  useEffect(() => {
    document.body.style.overflow = (cartOpen || menuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, menuOpen]);

  const categories = ["All", ...new Set(dishes.map((d) => d.category))];
  const filtered = activeCategory === "All" ? dishes : dishes.filter((d) => d.category === activeCategory);

  const addToCart = (dish) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) return prev.map((i) => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...dish, qty: 1 }];
    });
    setAddedItem(dish.id);
    setTimeout(() => setAddedItem(null), 1000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter((i) => i.qty > 0));
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => {
    const n = parseInt(i.price.replace(/[₹,]/g, ""));
    return s + n * i.qty;
  }, 0);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0804", color: "#f0e6d3", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0804; }

        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Lato', sans-serif; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes floatY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); } 10% { transform: translate(-2%, -3%); }
          30% { transform: translate(3%, 1%); } 50% { transform: translate(-1%, 2%); }
          70% { transform: translate(2%, -2%); } 90% { transform: translate(-3%, 1%); }
        }
        @keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }

        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
        .animate-fadeIn { animation: fadeIn 0.6s ease forwards; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.5s; }

        .gold-gradient {
          background: linear-gradient(135deg, #c8a96e 0%, #e8d5a3 40%, #c8a96e 70%, #a07840 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: grain 0.5s steps(1) infinite;
        }

        .divider-gold {
          width: 80px; height: 2px;
          background: linear-gradient(90deg, transparent, #c8a96e, transparent);
          margin: 0 auto;
        }

        /* DISH CARD */
        .dish-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative; overflow: hidden;
          background: #110d07;
          border: 1px solid rgba(200,169,110,0.1);
          border-radius: 16px;
        }
        .dish-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 24px 50px rgba(0,0,0,0.5); }
        .dish-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(200,169,110,0.05) 0%, transparent 100%);
          opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .dish-card:hover::before { opacity: 1; }

        /* GOLD BUTTON */
        .btn-gold {
          background: linear-gradient(135deg, #c8a96e, #a07840);
          color: #0a0804; font-weight: 700; letter-spacing: 0.08em;
          transition: all 0.3s ease; position: relative; overflow: hidden;
          border: none; cursor: pointer;
        }
        .btn-gold::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #e8d5a3, #c8a96e);
          opacity: 0; transition: opacity 0.3s;
        }
        .btn-gold:hover::after { opacity: 1; }
        .btn-gold span { position: relative; z-index: 1; }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(200,169,110,0.4); }

        /* NAV LINK */
        .nav-link { position: relative; transition: color 0.3s; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: #c8a96e; transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #c8a96e !important; }

        /* CATEGORY BUTTON */
        .category-btn { transition: all 0.3s ease; border: 1px solid rgba(200,169,110,0.2); }
        .category-btn:hover, .category-btn.active {
          background: linear-gradient(135deg, #c8a96e, #a07840) !important;
          color: #0a0804 !important; border-color: #c8a96e !important;
          transform: translateY(-2px);
        }

        /* STAT CARD */
        .stat-card { border: 1px solid rgba(200,169,110,0.1); transition: all 0.3s ease; }
        .stat-card:hover { border-color: rgba(200,169,110,0.4); background: rgba(200,169,110,0.05) !important; transform: translateY(-4px); }

        /* CART DRAWER */
        .cart-drawer {
          position: fixed; top: 0; right: 0; height: 100vh;
          width: min(380px, 100vw);
          background: #110d07;
          border-left: 1px solid rgba(200,169,110,0.2);
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .cart-drawer.open { transform: translateX(0); }

        /* MOBILE MENU DRAWER */
        .mob-drawer {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(10,8,4,0.98);
          z-index: 998;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 2rem;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }
        .mob-drawer.open { opacity: 1; pointer-events: all; }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0804; }
        ::-webkit-scrollbar-thumb { background: #c8a96e44; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #c8a96e; }

        /* ============ RESPONSIVE ============ */

        /* Nav */
        .nav-desktop-links { display: flex; }
        .nav-hamburger { display: none; }

        /* Stats grid */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

        /* About grid */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

        /* Dish grid */
        .dish-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

        /* Experience grid */
        .exp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }

        /* Reservation form grid */
        .res-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* Contact info */
        .contact-info { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }

        /* Padding helpers */
        .section-pad { padding: 120px 40px; }
        .hero-pad { padding: 0 24px; }
        .nav-pad { padding: 0 40px; }
        .footer-pad { padding: 40px; }

        /* ---- TABLET (max 1024px) ---- */
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .about-img-wrap { max-width: 500px; margin: 0 auto; }
          .exp-grid { grid-template-columns: repeat(2, 1fr); }
          .dish-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
          .section-pad { padding: 80px 32px; }
        }

        /* ---- MOBILE (max 768px) ---- */
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-pad { padding: 0 20px; }

          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }

          .about-grid { grid-template-columns: 1fr; gap: 40px; }

          .dish-grid { grid-template-columns: 1fr; }

          .exp-grid { grid-template-columns: 1fr; gap: 16px; }

          .res-form-grid { grid-template-columns: 1fr; }

          .contact-info { flex-direction: column; align-items: center; gap: 28px; }

          .section-pad { padding: 60px 20px; }
          .hero-pad { padding: 0 16px; }
          .footer-pad { padding: 24px 20px; }

          .hero-btns { flex-direction: column; align-items: center; }
          .hero-btns a, .hero-btns button { width: 100%; max-width: 280px; text-align: center; }

          .hero-stat-row { flex-wrap: wrap; gap: 20px; justify-content: center; }

          .footer-inner { flex-direction: column; align-items: center; text-align: center; gap: 20px; }
          .footer-social { justify-content: center; }

          .about-badges { flex-direction: row; flex-wrap: wrap; justify-content: center; }

          .cat-row { justify-content: flex-start; overflow-x: auto; padding-bottom: 8px; }
          .cat-row::-webkit-scrollbar { height: 2px; }
          .cat-row::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.3); }
        }

        /* ---- SMALL MOBILE (max 480px) ---- */
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .stat-num { font-size: 32px !important; }
          .section-pad { padding: 48px 16px; }
          .exp-card-pad { padding: 20px !important; }
          .cart-drawer { width: 100vw; }
        }
      `}</style>

      <div className="grain-overlay" />

      {/* Cart Overlay */}
      {cartOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999 }}
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`mob-drawer ${menuOpen ? "open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "#f0e6d3", fontSize: 28, cursor: "pointer" }}
        >✕</button>
        {["about", "menu", "experience", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            style={{
              background: "none", border: "none", color: "#f0e6d3",
              fontFamily: "'Playfair Display', serif", fontSize: 28,
              cursor: "pointer", letterSpacing: "0.1em", textTransform: "capitalize",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = "#c8a96e"}
            onMouseLeave={e => e.target.style.color = "#f0e6d3"}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 className="font-display" style={{ color: "#c8a96e", fontSize: 22 }}>Your Order</h3>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#f0e6d3", cursor: "pointer", fontSize: 24 }}>✕</button>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.5 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
              <p className="font-body" style={{ fontSize: 14 }}>Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0", borderBottom: "1px solid rgba(200,169,110,0.1)" }}>
                  <img src={item.image} alt={item.name} style={{ width: 52, height: 52, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="font-display" style={{ fontSize: 14, color: "#f0e6d3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                    <div className="font-body" style={{ fontSize: 12, color: "#c8a96e" }}>{item.price}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => removeFromCart(item.id)} style={{ width: 28, height: 28, border: "1px solid rgba(200,169,110,0.3)", background: "none", color: "#c8a96e", cursor: "pointer", borderRadius: 4, fontSize: 16 }}>−</button>
                    <span className="font-body" style={{ fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => addToCart(item)} style={{ width: 28, height: 28, border: "1px solid rgba(200,169,110,0.3)", background: "none", color: "#c8a96e", cursor: "pointer", borderRadius: 4, fontSize: 16 }}>+</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "20px", background: "rgba(200,169,110,0.08)", borderRadius: 12, border: "1px solid rgba(200,169,110,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="font-body" style={{ opacity: 0.7, fontSize: 13 }}>Subtotal</span>
                  <span className="font-body" style={{ fontSize: 13 }}>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span className="font-body" style={{ opacity: 0.7, fontSize: 13 }}>Taxes & Fees</span>
                  <span className="font-body" style={{ fontSize: 13 }}>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(200,169,110,0.2)", marginBottom: 16 }}>
                  <span className="font-display" style={{ color: "#c8a96e", fontSize: 16 }}>Total</span>
                  <span className="font-display" style={{ color: "#c8a96e", fontSize: 16 }}>₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
                </div>
                <button className="btn-gold" style={{ width: "100%", padding: "14px", borderRadius: 8, fontSize: 14, fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em" }}>
                  <span>PLACE ORDER →</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ====== NAV ====== */}
      <nav
        className="nav-pad"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          height: scrolled ? 60 : 72,
          background: scrolled ? "rgba(10,8,4,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,169,110,0.1)" : "none",
          transition: "all 0.4s ease",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div className="font-display" style={{ fontSize: 20, letterSpacing: "0.12em", flexShrink: 0 }}>
          <span className="gold-gradient">AURUM</span>
          <span style={{ opacity: 0.4, fontSize: 11, marginLeft: 6 }}>BRASSERIE</span>
        </div>

        {/* Desktop Links */}
        <div className="nav-desktop-links font-body" style={{ gap: 32, fontSize: 11, letterSpacing: "0.15em", color: "rgba(240,230,211,0.7)" }}>
          {["about", "menu", "experience", "contact"].map((item) => (
            <button key={item} className="nav-link" onClick={() => scrollTo(item)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontFamily: "'Lato', sans-serif", letterSpacing: "0.15em", fontSize: 11, textTransform: "uppercase" }}>
              {item}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Cart button */}
          <button onClick={() => setCartOpen(true)}
            style={{ position: "relative", background: "none", border: "1px solid rgba(200,169,110,0.3)", color: "#c8a96e", padding: "7px 14px", cursor: "pointer", borderRadius: 4, fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6, transition: "all 0.3s" }}>
            <span>🛒</span>
            <span className="font-body">ORDER</span>
            {totalItems > 0 && (
              <span style={{ background: "#c8a96e", color: "#0a0804", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, animation: "bounceIn 0.4s ease" }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "1px solid rgba(200,169,110,0.25)", borderRadius: 4, cursor: "pointer", padding: "7px 10px", display: "none", flexDirection: "column", gap: 4, alignItems: "center", justifyContent: "center" }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 20, height: 1.5, background: "#c8a96e", borderRadius: 2 }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ====== HERO ====== */}
      <section id="hero" className="hero-pad"
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          position: "relative", overflow: "hidden",
          background: "radial-gradient(ellipse at 20% 50%, rgba(200,169,110,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(200,100,50,0.06) 0%, transparent 50%), linear-gradient(180deg, #0a0804 0%, #120e08 50%, #0a0804 100%)",
        }}
      >
        <div style={{ position: "absolute", width: "min(600px, 90vw)", height: "min(600px, 90vw)", borderRadius: "50%", border: "1px solid rgba(200,169,110,0.05)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "floatY 8s ease-in-out infinite", pointerEvents: "none" }} />

        <div className="animate-fadeUp font-body"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(200,169,110,0.3)", padding: "6px 18px", borderRadius: 100, fontSize: 10, letterSpacing: "0.18em", color: "#c8a96e", marginBottom: 28, textTransform: "uppercase", opacity: 0 }}>
          <span style={{ animation: "shimmer 2s infinite" }}>✦</span>
          Est. 2012 · Fine Dining Experience
          <span style={{ animation: "shimmer 2s infinite 1s" }}>✦</span>
        </div>

        <h1 className="font-display animate-fadeUp delay-1"
          style={{ fontSize: "clamp(42px, 9vw, 120px)", lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 8, opacity: 0 }}>
          <span className="gold-gradient">Where</span><br />
          <span style={{ fontStyle: "italic", opacity: 0.9 }}>Flavour</span><br />
          <span className="gold-gradient">Meets</span>{" "}<span style={{ fontStyle: "italic" }}>Art</span>
        </h1>

        <p className="font-body animate-fadeUp delay-2"
          style={{ fontSize: "clamp(13px, 2vw, 16px)", opacity: 0, color: "rgba(240,230,211,0.5)", maxWidth: 440, lineHeight: 1.8, margin: "20px auto 36px", letterSpacing: "0.04em" }}>
          A culinary journey crafted by award-winning chefs. Every plate is a canvas. Every bite, a memory.
        </p>

        <div className="animate-fadeUp delay-3 hero-btns"
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: 0 }}>
          <button className="btn-gold font-body" onClick={() => scrollTo("menu")}
            style={{ padding: "13px 36px", borderRadius: 4, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <span>Explore Menu</span>
          </button>
          <button onClick={() => scrollTo("about")} className="font-body"
            style={{ padding: "13px 36px", border: "1px solid rgba(200,169,110,0.3)", background: "none", color: "#c8a96e", cursor: "pointer", borderRadius: 4, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.target.style.background = "rgba(200,169,110,0.08)"; }}
            onMouseLeave={e => { e.target.style.background = "none"; }}
          >
            Our Story
          </button>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", animation: "floatY 2s ease-in-out infinite" }}>
          <span className="font-body">scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(200,169,110,0.8), transparent)" }} />
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section style={{ padding: "60px 20px", background: "rgba(200,169,110,0.04)", borderTop: "1px solid rgba(200,169,110,0.1)", borderBottom: "1px solid rgba(200,169,110,0.1)" }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{ textAlign: "center", padding: "28px 12px", borderRadius: 12 }}>
              <div className="font-display gold-gradient stat-num" style={{ fontSize: 44, fontWeight: 900, lineHeight: 1 }}>{s.number}</div>
              <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section id="about" className="section-pad" style={{ background: "linear-gradient(180deg, #0a0804 0%, #110d07 50%, #0a0804 100%)" }}>
        <div className="about-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div>
            <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 14 }}>Our Story</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15, marginBottom: 20 }}>
              A Legacy of{" "}<span style={{ fontStyle: "italic" }} className="gold-gradient">Taste & Tradition</span>
            </h2>
            <div className="divider-gold" style={{ margin: "0 0 28px 0" }} />
            <p className="font-body" style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(240,230,211,0.65)", marginBottom: 16 }}>
              Founded in the heart of Hyderabad in 2012, Aurum Brasserie was born from a singular obsession: to create food that transcends the ordinary. Our culinary team, trained across Paris, Tokyo, and Mumbai, brings global techniques to regional ingredients.
            </p>
            <p className="font-body" style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(240,230,211,0.65)", marginBottom: 32 }}>
              Every menu item is a result of months of refinement. We source produce from local farms, rare spices from across India, and premium imports — all to serve you something genuinely unforgettable.
            </p>
            <div className="about-badges" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[["🏆", "18 Awards"], ["👨‍🍳", "12 Expert Chefs"], ["🌿", "Farm to Table"]].map(([icon, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, marginBottom: 4 }}>{icon}</div>
                  <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.1em", opacity: 0.6, textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-img-wrap" style={{ position: "relative" }}>
            <div style={{ width: "100%", paddingBottom: "110%", background: "linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(200,100,50,0.08) 50%, rgba(10,8,4,1) 100%)", borderRadius: 16, border: "1px solid rgba(200,169,110,0.15)", position: "relative", overflow: "hidden" }}>
              <img src={restaurant} alt="Aurum Brasserie" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, borderRadius: 16 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", background: "linear-gradient(to top, rgba(10,8,4,0.9), transparent)", borderRadius: "0 0 16px 16px" }}>
                <div className="font-display" style={{ fontSize: 18, color: "#c8a96e" }}>Est. 2012</div>
                <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.5, textTransform: "uppercase" }}>Hyderabad, India</div>
              </div>
              {["top-left","top-right","bottom-left","bottom-right"].map((pos) => (
                <div key={pos} style={{ position: "absolute", [pos.includes("top") ? "top" : "bottom"]: 14, [pos.includes("left") ? "left" : "right"]: 14, width: 28, height: 28, borderTop: pos.includes("top") ? "2px solid rgba(200,169,110,0.3)" : "none", borderBottom: pos.includes("bottom") ? "2px solid rgba(200,169,110,0.3)" : "none", borderLeft: pos.includes("left") ? "2px solid rgba(200,169,110,0.3)" : "none", borderRight: pos.includes("right") ? "2px solid rgba(200,169,110,0.3)" : "none" }} />
              ))}
            </div>
            <div style={{ position: "absolute", bottom: -16, left: -16, background: "#110d07", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 12, padding: "16px 20px", animation: "floatY 5s ease-in-out infinite 1s", zIndex: 2 }}>
              <div className="font-display gold-gradient" style={{ fontSize: 28 }}>4.9★</div>
              <div className="font-body" style={{ fontSize: 9, letterSpacing: "0.1em", opacity: 0.5, textTransform: "uppercase" }}>50K+ Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MENU ====== */}
      <section id="menu" className="section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 14 }}>Our Menu</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1, marginBottom: 14 }}>
              Crafted with{" "}<span style={{ fontStyle: "italic" }} className="gold-gradient">Passion</span>
            </h2>
            <div className="divider-gold" style={{ marginBottom: 36 }} />
            <div className="cat-row" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button key={cat} className={`category-btn font-body ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}
                  style={{ padding: "8px 18px", borderRadius: 100, background: activeCategory === cat ? "linear-gradient(135deg, #c8a96e, #a07840)" : "transparent", color: activeCategory === cat ? "#0a0804" : "rgba(240,230,211,0.6)", cursor: "pointer", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", fontWeight: activeCategory === cat ? 700 : 400, whiteSpace: "nowrap" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="dish-grid">
            {filtered.map((dish) => (
              <div key={dish.id} className="dish-card">
                <div style={{ height: 200, position: "relative", borderBottom: "1px solid rgba(200,169,110,0.08)", overflow: "hidden" }}>
                  <img src={dish.image} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                  <div className="font-body" style={{ position: "absolute", top: 14, right: 14, background: dish.color, color: "#0a0804", padding: "3px 10px", borderRadius: 100, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{dish.tag}</div>
                  <div className="font-body" style={{ position: "absolute", top: 14, left: 14, color: "rgba(200,169,110,0.7)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" }}>{dish.category}</div>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
                    <h3 className="font-display" style={{ fontSize: 18, letterSpacing: "0.02em" }}>{dish.name}</h3>
                    <span className="font-display gold-gradient" style={{ fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{dish.price}</span>
                  </div>
                  <p className="font-body" style={{ fontSize: 12, color: "rgba(240,230,211,0.5)", lineHeight: 1.6, marginBottom: 18 }}>{dish.desc}</p>
                  <button className="btn-gold font-body" onClick={() => addToCart(dish)}
                    style={{ width: "100%", padding: "11px", borderRadius: 8, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: addedItem === dish.id ? "linear-gradient(135deg, #4a9e7f, #2d7a5f)" : undefined }}>
                    <span>{addedItem === dish.id ? "✓ Added!" : "Add to Order"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== EXPERIENCE ====== */}
      <section id="experience" className="section-pad" style={{ background: "linear-gradient(180deg, #0a0804 0%, #110d07 50%, #0a0804 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 14 }}>The Experience</div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1, marginBottom: 14 }}>
            More Than a{" "}<span style={{ fontStyle: "italic" }} className="gold-gradient">Meal</span>
          </h2>
          <div className="divider-gold" style={{ marginBottom: 48 }} />

          <div className="exp-grid" style={{ marginBottom: 64 }}>
            {[
              { icon: "🕯️", title: "Intimate Ambience", desc: "Candlelit tables, curated playlists, and interiors inspired by Parisian brasseries." },
              { icon: "🍷", title: "Wine Cellar", desc: "Over 200 labels from premier vineyards of France, Italy, and the Napa Valley." },
              { icon: "👨‍🍳", title: "Chef's Table", desc: "A private 8-seat experience where Chef Aryan crafts your menu personally, live." },
            ].map((item) => (
              <div key={item.title} className="exp-card-pad"
                style={{ padding: 28, border: "1px solid rgba(200,169,110,0.1)", borderRadius: 16, background: "rgba(200,169,110,0.03)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.3)"; e.currentTarget.style.background = "rgba(200,169,110,0.07)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.1)"; e.currentTarget.style.background = "rgba(200,169,110,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3 className="font-display" style={{ fontSize: 18, marginBottom: 10, color: "#c8a96e" }}>{item.title}</h3>
                <p className="font-body" style={{ fontSize: 13, color: "rgba(240,230,211,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ position: "relative", minHeight: 200 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: activeTestimonial === i ? 1 : 0, transform: activeTestimonial === i ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s ease", pointerEvents: activeTestimonial === i ? "auto" : "none" }}>
                <div style={{ fontSize: 36, color: "rgba(200,169,110,0.3)", marginBottom: 14, fontFamily: "Georgia" }}>❝</div>
                <p className="font-display" style={{ fontSize: "clamp(15px, 2.5vw, 20px)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 20, color: "rgba(240,230,211,0.8)" }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #c8a96e, #a07840)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a0804", fontWeight: 700, fontFamily: "'Lato', sans-serif", fontSize: 13 }}>{t.avatar}</div>
                  <div style={{ textAlign: "left" }}>
                    <div className="font-body" style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                    <div className="font-body" style={{ fontSize: 10, opacity: 0.4, letterSpacing: "0.1em" }}>{t.role}</div>
                  </div>
                  <div style={{ color: "#c8a96e", fontSize: 13, letterSpacing: 2 }}>{"★".repeat(t.rating)}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: activeTestimonial === i ? 24 : 8, height: 8, borderRadius: 4, background: activeTestimonial === i ? "#c8a96e" : "rgba(200,169,110,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== RESERVATION ====== */}
      <section id="contact" className="section-pad" style={{ background: "rgba(200,169,110,0.03)", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 14 }}>Reserve a Table</div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1, marginBottom: 14 }}>
            Book Your{" "}<span style={{ fontStyle: "italic" }} className="gold-gradient">Evening</span>
          </h2>
          <div className="divider-gold" style={{ marginBottom: 40 }} />

          <div className="res-form-grid" style={{ marginBottom: 14, textAlign: "left" }}>
            {[
              { label: "Full Name", placeholder: "Your name", type: "text" },
              { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
              { label: "Date", placeholder: "DD / MM / YYYY", type: "text" },
              { label: "Guests", placeholder: "No. of guests", type: "number" },
            ].map((field) => (
              <div key={field.label}>
                <label className="font-body" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, display: "block", marginBottom: 7 }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder}
                  style={{ width: "100%", padding: "12px 14px", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 8, color: "#f0e6d3", fontFamily: "'Lato', sans-serif", fontSize: 13, outline: "none", transition: "border-color 0.3s" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(200,169,110,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(200,169,110,0.15)")}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 28, textAlign: "left" }}>
            <label className="font-body" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, display: "block", marginBottom: 7 }}>Special Requests</label>
            <textarea placeholder="Dietary preferences, anniversary setup, etc." rows={3}
              style={{ width: "100%", padding: "12px 14px", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 8, color: "#f0e6d3", fontFamily: "'Lato', sans-serif", fontSize: 13, outline: "none", resize: "vertical", transition: "border-color 0.3s" }}
              onFocus={e => (e.target.style.borderColor = "rgba(200,169,110,0.5)")}
              onBlur={e => (e.target.style.borderColor = "rgba(200,169,110,0.15)")}
            />
          </div>

          <button className="btn-gold font-body" style={{ padding: "14px 52px", borderRadius: 8, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <span>Confirm Reservation →</span>
          </button>

          <div className="contact-info" style={{ marginTop: 52, paddingTop: 40, borderTop: "1px solid rgba(200,169,110,0.1)" }}>
            {[
              { icon: "📍", label: "Location", value: "Banjara Hills, Hyderabad" },
              { icon: "📞", label: "Phone", value: "+91 40 2345 6789" },
              { icon: "🕐", label: "Hours", value: "12 PM – 11:30 PM" },
            ].map((c) => (
              <div key={c.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 7 }}>{c.icon}</div>
                <div className="font-body" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4, marginBottom: 4 }}>{c.label}</div>
                <div className="font-body" style={{ fontSize: 13, color: "#c8a96e" }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="footer-pad" style={{ borderTop: "1px solid rgba(200,169,110,0.1)" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="font-display" style={{ fontSize: 17, letterSpacing: "0.1em" }}>
            <span className="gold-gradient">AURUM</span>
            <span style={{ opacity: 0.3, fontSize: 10, marginLeft: 6 }}>BRASSERIE</span>
          </div>
          <div className="font-body" style={{ fontSize: 10, opacity: 0.3, letterSpacing: "0.08em" }}>© 2024 Aurum Brasserie. All rights reserved.</div>
          <div className="footer-social" style={{ display: "flex", gap: 20 }}>
            {["Instagram", "Facebook", "Zomato"].map((s) => (
              <span key={s} className="font-body"
                style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(200,169,110,0.5)", cursor: "pointer", transition: "color 0.3s", textTransform: "uppercase" }}
                onMouseEnter={e => (e.target.style.color = "#c8a96e")}
                onMouseLeave={e => (e.target.style.color = "rgba(200,169,110,0.5)")}
              >{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
