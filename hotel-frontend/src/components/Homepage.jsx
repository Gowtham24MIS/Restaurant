import { useState, useEffect } from "react";
import truffle from "../assets/tuffle.jpg";
import steak from "../assets/wague-steak.jpg";
import butterchicken from "../assets/butter-chicken.jpg";
import dragonroll from "../assets/dragon-roll.jpg";
import mezze from "../assets/mezze-patter.jpg"; 
import creme from "../assets/creme-bruele.jpg";
import restaurant from "../assets/restaurant.jpg";

const dishes = [
  {
    id: 1,
    name: "Truffle Risotto",
    price: "₹1,299",
    category: "Italian",
    desc: "Creamy Arborio rice with black truffle shavings and aged Parmigiano",
    image: truffle,
    tag: "Chef's Pick",
    color: "#c8a96e",
  },
  {
    id: 2,
    name: "Butter Chicken",
    price: "₹649",
    category: "Indian",
    desc: "Slow-cooked tender chicken in a velvety tomato-cream masala sauce",
    image : butterchicken,
    tag: "Bestseller",
    color: "#e07b39",
  },
  {
    id: 3,
    name: "Dragon Roll",
    price: "₹899",
    category: "Japanese",
    desc: "Tempura prawn, avocado, cucumber topped with spicy tuna",
    image : dragonroll,
    tag: "New",
    color: "#4a9e7f",
  },
  {
    id: 4,
    name: "Wagyu Steak",
    price: "₹3,499",
    category: "Continental",
    desc: "A5 Japanese Wagyu with truffle butter and roasted bone marrow",
    image : steak,
    tag: "Premium",
    color: "#b34a4a",
  },
  {
    id: 5,
    name: "Mezze Platter",
    price: "₹749",
    category: "Mediterranean",
    desc: "Hummus, baba ghanoush, falafel, pita, olives & tabbouleh",
    image : mezze,
    tag: "Veg",
    color: "#7a6db5",
  },
  {
    id: 6,
    name: "Crème Brûlée",
    price: "₹449",
    category: "Dessert",
    desc: "Classic French vanilla custard with a perfectly caramelised sugar crust",
    image : creme,
    tag: "Must Try",
    color: "#c4a052",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Food Blogger",
    text: "Absolutely divine experience. The Wagyu Steak melted like a dream. Will return every weekend!",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Arjun Mehta",
    role: "Business Executive",
    text: "Perfect ambience for corporate dinners. The truffle risotto is simply unforgettable.",
    rating: 5,
    avatar: "AM",
  },
  {
    name: "Sneha Rao",
    role: "Travel Enthusiast",
    text: "Best hotel dining I've experienced in Hyderabad. Every dish tells a story.",
    rating: 5,
    avatar: "SR",
  },
];

const stats = [
  { number: "12+", label: "Years of Excellence" },
  { number: "250+", label: "Signature Dishes" },
  { number: "50K+", label: "Happy Guests" },
  { number: "18", label: "Awards Won" },
];

export default function Homepage() {
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

  const categories = ["All", ...new Set(dishes.map((d) => d.category))];
  const filtered =
    activeCategory === "All"
      ? dishes
      : dishes.filter((d) => d.category === activeCategory);

  const addToCart = (dish) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing)
        return prev.map((i) =>
          i.id === dish.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...dish, qty: 1 }];
    });
    setAddedItem(dish.id);
    setTimeout(() => setAddedItem(null), 1000);
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
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
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: "#0a0804",
        color: "#f0e6d3",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lato:wght@300;400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body { background: #0a0804; }

        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Lato', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          30% { transform: translate(3%, 1%); }
          50% { transform: translate(-1%, 2%); }
          70% { transform: translate(2%, -2%); }
          90% { transform: translate(-3%, 1%); }
        }

        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
        .animate-fadeIn { animation: fadeIn 0.6s ease forwards; }
        .animate-slideDown { animation: slideDown 0.4s ease forwards; }
        .animate-bounceIn { animation: bounceIn 0.5s ease forwards; }
        .animate-float { animation: floatY 4s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.5s; }
        .delay-4 { animation-delay: 0.7s; }

        .gold-gradient {
          background: linear-gradient(135deg, #c8a96e 0%, #e8d5a3 40%, #c8a96e 70%, #a07840 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dish-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .dish-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .dish-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200,169,110,0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .dish-card:hover::before { opacity: 1; }

        .btn-gold {
          background: linear-gradient(135deg, #c8a96e, #a07840);
          color: #0a0804;
          font-weight: 700;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-gold::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e8d5a3, #c8a96e);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-gold:hover::after { opacity: 1; }
        .btn-gold span { position: relative; z-index: 1; }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(200,169,110,0.4); }

        .nav-link {
          position: relative;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #c8a96e;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #c8a96e; }

        .grain-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: grain 0.5s steps(1) infinite;
        }

        .divider-gold {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8a96e, transparent);
          margin: 0 auto;
        }

        .hero-bg {
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(200,169,110,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(200,100,50,0.06) 0%, transparent 50%),
            linear-gradient(180deg, #0a0804 0%, #120e08 50%, #0a0804 100%);
        }

        .section-bg-alt {
          background: linear-gradient(180deg, #0a0804 0%, #110d07 50%, #0a0804 100%);
        }

        .scroll-indicator {
          animation: floatY 2s ease-in-out infinite;
        }

        .star { color: #c8a96e; }

        .category-btn {
          transition: all 0.3s ease;
          border: 1px solid rgba(200,169,110,0.2);
        }
        .category-btn:hover, .category-btn.active {
          background: linear-gradient(135deg, #c8a96e, #a07840);
          color: #0a0804;
          border-color: #c8a96e;
          transform: translateY(-2px);
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 380px;
          background: #110d07;
          border-left: 1px solid rgba(200,169,110,0.2);
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .cart-drawer.open {
          transform: translateX(0);
        }

        .stat-card {
          border: 1px solid rgba(200,169,110,0.1);
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          border-color: rgba(200,169,110,0.4);
          background: rgba(200,169,110,0.05);
          transform: translateY(-4px);
        }

        .testimonial-card {
          transition: all 0.5s ease;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0804; }
        ::-webkit-scrollbar-thumb { background: #c8a96e44; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #c8a96e; }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Cart Overlay */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 999,
          }}
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <h3
              className="font-display"
              style={{ color: "#c8a96e", fontSize: 22 }}
            >
              Your Order
            </h3>
            <button
              onClick={() => setCartOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#f0e6d3",
                cursor: "pointer",
                fontSize: 24,
              }}
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.5 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
              <p className="font-body" style={{ fontSize: 14 }}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(200,169,110,0.1)",
                  }}
                >
                  <div style={{ fontSize: 32 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="font-display"
                      style={{ fontSize: 14, color: "#f0e6d3" }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="font-body"
                      style={{ fontSize: 12, color: "#c8a96e" }}
                    >
                      {item.price}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        width: 28,
                        height: 28,
                        border: "1px solid rgba(200,169,110,0.3)",
                        background: "none",
                        color: "#c8a96e",
                        cursor: "pointer",
                        borderRadius: 4,
                        fontSize: 16,
                      }}
                    >
                      −
                    </button>
                    <span
                      className="font-body"
                      style={{ fontSize: 14, minWidth: 20, textAlign: "center" }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: 28,
                        height: 28,
                        border: "1px solid rgba(200,169,110,0.3)",
                        background: "none",
                        color: "#c8a96e",
                        cursor: "pointer",
                        borderRadius: 4,
                        fontSize: 16,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: 24,
                  padding: "20px",
                  background: "rgba(200,169,110,0.08)",
                  borderRadius: 12,
                  border: "1px solid rgba(200,169,110,0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span className="font-body" style={{ opacity: 0.7, fontSize: 13 }}>
                    Subtotal
                  </span>
                  <span className="font-body" style={{ fontSize: 13 }}>
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <span className="font-body" style={{ opacity: 0.7, fontSize: 13 }}>
                    Taxes & Fees
                  </span>
                  <span className="font-body" style={{ fontSize: 13 }}>
                    ₹{Math.round(totalPrice * 0.18).toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 12,
                    borderTop: "1px solid rgba(200,169,110,0.2)",
                    marginBottom: 16,
                  }}
                >
                  <span className="font-display" style={{ color: "#c8a96e", fontSize: 16 }}>
                    Total
                  </span>
                  <span className="font-display" style={{ color: "#c8a96e", fontSize: 16 }}>
                    ₹{Math.round(totalPrice * 1.18).toLocaleString()}
                  </span>
                </div>
                <button
                  className="btn-gold"
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 14,
                    fontFamily: "'Lato', sans-serif",
                    letterSpacing: "0.1em",
                  }}
                >
                  <span>PLACE ORDER →</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "12px 40px" : "24px 40px",
          background: scrolled
            ? "rgba(10,8,4,0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(200,169,110,0.1)"
            : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="font-display"
          style={{
            fontSize: 22,
            letterSpacing: "0.15em",
          }}
        >
          <span className="gold-gradient">AURUM</span>
          <span style={{ opacity: 0.4, fontSize: 13, marginLeft: 8 }}>
            BRASSERIE
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          className="font-body"
          style={{
            display: "flex",
            gap: 36,
            fontSize: 12,
            letterSpacing: "0.15em",
            color: "rgba(240,230,211,0.7)",
          }}
        >
          {["about", "menu", "experience", "contact"].map((item) => (
            <button
              key={item}
              className="nav-link"
              onClick={() => scrollTo(item)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                fontFamily: "'Lato', sans-serif",
                letterSpacing: "0.15em",
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative",
              background: "none",
              border: "1px solid rgba(200,169,110,0.3)",
              color: "#c8a96e",
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: 4,
              fontFamily: "'Lato', sans-serif",
              fontSize: 12,
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.3s",
            }}
          >
            <span>🛒</span>
            <span className="font-body">ORDER</span>
            {totalItems > 0 && (
              <span
                style={{
                  background: "#c8a96e",
                  color: "#0a0804",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  animation: "bounceIn 0.4s ease",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="hero-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(200,169,110,0.05)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            animation: "floatY 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            border: "1px solid rgba(200,169,110,0.03)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />

        {/* Badge */}
        <div
          className="animate-fadeUp font-body"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(200,169,110,0.3)",
            padding: "6px 18px",
            borderRadius: 100,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "#c8a96e",
            marginBottom: 32,
            textTransform: "uppercase",
            opacity: 0,
          }}
        >
          <span style={{ animation: "shimmer 2s infinite" }}>✦</span>
          Est. 2012 · Fine Dining Experience
          <span style={{ animation: "shimmer 2s infinite 1s" }}>✦</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display animate-fadeUp delay-1"
          style={{
            fontSize: "clamp(48px, 9vw, 120px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            marginBottom: 8,
            opacity: 0,
          }}
        >
          <span className="gold-gradient">Where</span>
          <br />
          <span style={{ fontStyle: "italic", opacity: 0.9 }}>Flavour</span>
          <br />
          <span className="gold-gradient">Meets</span>{" "}
          <span style={{ fontStyle: "italic" }}>Art</span>
        </h1>

        <p
          className="font-body animate-fadeUp delay-2"
          style={{
            fontSize: 16,
            opacity: 0,
            color: "rgba(240,230,211,0.5)",
            maxWidth: 480,
            lineHeight: 1.8,
            margin: "24px auto 40px",
            letterSpacing: "0.04em",
          }}
        >
          A culinary journey crafted by award-winning chefs. Every plate is a
          canvas. Every bite, a memory.
        </p>

        <div
          className="animate-fadeUp delay-3"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          <button
            className="btn-gold font-body"
            onClick={() => scrollTo("menu")}
            style={{
              padding: "14px 40px",
              border: "none",
              cursor: "pointer",
              borderRadius: 4,
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span>Explore Menu</span>
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="font-body"
            style={{
              padding: "14px 40px",
              border: "1px solid rgba(200,169,110,0.3)",
              background: "none",
              color: "#c8a96e",
              cursor: "pointer",
              borderRadius: 4,
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
          >
            Our Story
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator font-body"
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 0.4,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>scroll</span>
          <div
            style={{
              width: 1,
              height: 48,
              background:
                "linear-gradient(to bottom, rgba(200,169,110,0.8), transparent)",
            }}
          />
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "80px 40px", background: "rgba(200,169,110,0.04)", borderTop: "1px solid rgba(200,169,110,0.1)", borderBottom: "1px solid rgba(200,169,110,0.1)" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                textAlign: "center",
                padding: "32px 16px",
                borderRadius: 12,
              }}
            >
              <div
                className="font-display gold-gradient"
                style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}
              >
                {s.number}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                  marginTop: 8,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-bg-alt" style={{ padding: "120px 40px" }}>
        <div
          style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
        >
          <div>
            <div
              className="font-body"
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: 16,
              }}
            >
              Our Story
            </div>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.15, marginBottom: 24 }}
            >
              A Legacy of{" "}
              <span style={{ fontStyle: "italic" }} className="gold-gradient">
                Taste & Tradition
              </span>
            </h2>
            <div className="divider-gold" style={{ margin: "0 0 32px 0" }} />
            <p
              className="font-body"
              style={{
                fontSize: 15,
                lineHeight: 1.9,
                color: "rgba(240,230,211,0.65)",
                marginBottom: 20,
              }}
            >
              Founded in the heart of Hyderabad in 2012, Aurum Brasserie was born
              from a singular obsession: to create food that transcends the
              ordinary. Our culinary team, trained across Paris, Tokyo, and
              Mumbai, brings global techniques to regional ingredients.
            </p>
            <p
              className="font-body"
              style={{
                fontSize: 15,
                lineHeight: 1.9,
                color: "rgba(240,230,211,0.65)",
                marginBottom: 36,
              }}
            >
              Every menu item is a result of months of refinement. We source
              produce from local farms, rare spices from across India, and
              premium imports — all to serve you something genuinely
              unforgettable.
            </p>
            <div style={{ display: "flex", gap: 40 }}>
              {[["", "18 Awards"], ["", "12 Expert Chefs"], ["", "Farm to Table"]].map(([icon, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
                  <div className="font-body" style={{ fontSize: 11, letterSpacing: "0.1em", opacity: 0.6, textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            {/* Decorative image placeholder */}
            <div
              style={{
                width: "100%",
                paddingBottom: "120%",
                background: "linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(200,100,50,0.08) 50%, rgba(10,8,4,1) 100%)",
                borderRadius: 16,
                border: "1px solid rgba(200,169,110,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <img
  src={restaurant}
  alt="Aurum Brasserie"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 16,
  }}
/>
<div style={{
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "24px",
  background: "linear-gradient(to top, rgba(10,8,4,0.9), transparent)",
  borderRadius: "0 0 16px 16px",
}}>
  <div className="font-display" style={{ fontSize: 20, color: "#c8a96e" }}>
    Est. 2012
  </div>
  <div className="font-body" style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, textTransform: "uppercase" }}>
    Hyderabad, India
  </div>
</div>
              {/* Corner accents */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
                <div
                  key={pos}
                  style={{
                    position: "absolute",
                    [pos.includes("top") ? "top" : "bottom"]: 16,
                    [pos.includes("left") ? "left" : "right"]: 16,
                    width: 32,
                    height: 32,
                    borderTop: pos.includes("top") ? "2px solid rgba(200,169,110,0.3)" : "none",
                    borderBottom: pos.includes("bottom") ? "2px solid rgba(200,169,110,0.3)" : "none",
                    borderLeft: pos.includes("left") ? "2px solid rgba(200,169,110,0.3)" : "none",
                    borderRight: pos.includes("right") ? "2px solid rgba(200,169,110,0.3)" : "none",
                  }}
                />
              ))}
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: -20,
                background: "#110d07",
                border: "1px solid rgba(200,169,110,0.3)",
                borderRadius: 12,
                padding: "20px 24px",
                animation: "floatY 5s ease-in-out infinite 1s",
              }}
            >
              <div className="font-display gold-gradient" style={{ fontSize: 32 }}>4.9★</div>
              <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.1em", opacity: 0.5, textTransform: "uppercase" }}>
                50K+ Reviews
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              className="font-body"
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: 16,
              }}
            >
              Our Menu
            </div>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1, marginBottom: 16 }}
            >
              Crafted with{" "}
              <span style={{ fontStyle: "italic" }} className="gold-gradient">
                Passion
              </span>
            </h2>
            <div className="divider-gold" style={{ marginBottom: 48 }} />

            {/* Category Filter */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn font-body ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 100,
                    background: activeCategory === cat
                      ? "linear-gradient(135deg, #c8a96e, #a07840)"
                      : "transparent",
                    color: activeCategory === cat ? "#0a0804" : "rgba(240,230,211,0.6)",
                    cursor: "pointer",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: activeCategory === cat ? 700 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dish Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 24,
            }}
          >
            {filtered.map((dish) => (
              <div
                key={dish.id}
                className="dish-card"
                style={{
                  background: "#110d07",
                  border: "1px solid rgba(200,169,110,0.1)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                {/* Dish visual */}
                <div
                  style={{
                    height: 200,
                    background: `radial-gradient(ellipse at 30% 40%, ${dish.color}22 0%, transparent 60%), linear-gradient(135deg, #1a1208 0%, #110d07 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    borderBottom: "1px solid rgba(200,169,110,0.08)",
                  }}
                >
                  <img
  src={dish.image}
  alt={dish.name}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  }}
/>
                  <div
                    className="font-body"
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: dish.color,
                      color: "#0a0804",
                      padding: "4px 12px",
                      borderRadius: 100,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {dish.tag}
                  </div>
                  <div
                    className="font-body"
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      color: "rgba(200,169,110,0.5)",
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {dish.category}
                  </div>
                </div>

                {/* Dish info */}
                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{ fontSize: 20, letterSpacing: "0.02em" }}
                    >
                      {dish.name}
                    </h3>
                    <span
                      className="font-display gold-gradient"
                      style={{ fontSize: 18, fontWeight: 700 }}
                    >
                      {dish.price}
                    </span>
                  </div>
                  <p
                    className="font-body"
                    style={{
                      fontSize: 13,
                      color: "rgba(240,230,211,0.5)",
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}
                  >
                    {dish.desc}
                  </p>
                  <button
                    className="btn-gold font-body"
                    onClick={() => addToCart(dish)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      transition: addedItem === dish.id ? "none" : undefined,
                      background: addedItem === dish.id
                        ? "linear-gradient(135deg, #4a9e7f, #2d7a5f)"
                        : undefined,
                    }}
                  >
                    <span>{addedItem === dish.id ? "✓ Added!" : "Add to Order"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        style={{
          padding: "120px 40px",
          background: "linear-gradient(180deg, #0a0804 0%, #110d07 50%, #0a0804 100%)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            className="font-body"
            style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 16 }}
          >
            The Experience
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1, marginBottom: 16 }}
          >
            More Than a{" "}
            <span style={{ fontStyle: "italic" }} className="gold-gradient">
              Meal
            </span>
          </h2>
          <div className="divider-gold" style={{ marginBottom: 64 }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              marginBottom: 80,
            }}
          >
            {[
              { icon: "", title: "Intimate Ambience", desc: "Candlelit tables, curated playlists, and interiors inspired by Parisian brasseries." },
              { icon: "", title: "Wine Cellar", desc: "Over 200 labels from premier vineyards of France, Italy, and the Napa Valley." },
              { icon: "", title: "Chef's Table", desc: "A private 8-seat experience where Chef Aryan crafts your menu personally, live." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: 32,
                  border: "1px solid rgba(200,169,110,0.1)",
                  borderRadius: 16,
                  background: "rgba(200,169,110,0.03)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(200,169,110,0.3)";
                  e.currentTarget.style.background = "rgba(200,169,110,0.07)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(200,169,110,0.1)";
                  e.currentTarget.style.background = "rgba(200,169,110,0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 16 }}>{item.icon}</div>
                <h3 className="font-display" style={{ fontSize: 20, marginBottom: 12, color: "#c8a96e" }}>
                  {item.title}
                </h3>
                <p className="font-body" style={{ fontSize: 13, color: "rgba(240,230,211,0.5)", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{ position: "relative", minHeight: 160 }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: activeTestimonial === i ? 1 : 0,
                  transform: activeTestimonial === i ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.5s ease",
                  pointerEvents: activeTestimonial === i ? "auto" : "none",
                }}
              >
                <div style={{ fontSize: 40, color: "rgba(200,169,110,0.3)", marginBottom: 16, fontFamily: "Georgia" }}>❝</div>
                <p
                  className="font-display"
                  style={{ fontSize: 20, fontStyle: "italic", lineHeight: 1.6, marginBottom: 24, color: "rgba(240,230,211,0.8)" }}
                >
                  {t.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #c8a96e, #a07840)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0a0804",
                      fontWeight: 700,
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 14,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div className="font-body" style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div className="font-body" style={{ fontSize: 11, opacity: 0.4, letterSpacing: "0.1em" }}>{t.role}</div>
                  </div>
                  <div className="star" style={{ fontSize: 14, letterSpacing: 2 }}>
                    {"★".repeat(t.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial dots */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: activeTestimonial === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeTestimonial === i ? "#c8a96e" : "rgba(200,169,110,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION / CONTACT */}
      <section
        id="contact"
        style={{
          padding: "120px 40px",
          background: "rgba(200,169,110,0.03)",
          borderTop: "1px solid rgba(200,169,110,0.1)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div
            className="font-body"
            style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 16 }}
          >
            Reserve a Table
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1, marginBottom: 16 }}
          >
            Book Your{" "}
            <span style={{ fontStyle: "italic" }} className="gold-gradient">
              Evening
            </span>
          </h2>
          <div className="divider-gold" style={{ marginBottom: 48 }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
              textAlign: "left",
            }}
          >
            {[
              { label: "Full Name", placeholder: "Your name", type: "text" },
              { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
              { label: "Date", placeholder: "DD / MM / YYYY", type: "text" },
              { label: "Guests", placeholder: "No. of guests", type: "number" },
            ].map((field) => (
              <div key={field.label}>
                <label
                  className="font-body"
                  style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, display: "block", marginBottom: 8 }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(200,169,110,0.05)",
                    border: "1px solid rgba(200,169,110,0.15)",
                    borderRadius: 8,
                    color: "#f0e6d3",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(200,169,110,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(200,169,110,0.15)")}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 32, textAlign: "left" }}>
            <label
              className="font-body"
              style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, display: "block", marginBottom: 8 }}
            >
              Special Requests
            </label>
            <textarea
              placeholder="Dietary preferences, anniversary setup, etc."
              rows={4}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(200,169,110,0.05)",
                border: "1px solid rgba(200,169,110,0.15)",
                borderRadius: 8,
                color: "#f0e6d3",
                fontFamily: "'Lato', sans-serif",
                fontSize: 14,
                outline: "none",
                resize: "vertical",
                transition: "border-color 0.3s",
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(200,169,110,0.5)")}
              onBlur={e => (e.target.style.borderColor = "rgba(200,169,110,0.15)")}
            />
          </div>

          <button
            className="btn-gold font-body"
            style={{
              padding: "16px 60px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span>Confirm Reservation →</span>
          </button>

          {/* Contact info */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              marginTop: 64,
              paddingTop: 48,
              borderTop: "1px solid rgba(200,169,110,0.1)",
            }}
          >
            {[
              { icon: "", label: "Location", value: "Banjara Hills, Hyderabad" },
              { icon: "", label: "Phone", value: "+91 40 2345 6789" },
              { icon: "", label: "Hours", value: "12 PM – 11:30 PM" },
            ].map((c) => (
              <div key={c.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <div className="font-body" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4, marginBottom: 4 }}>
                  {c.label}
                </div>
                <div className="font-body" style={{ fontSize: 13, color: "#c8a96e" }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px",
          borderTop: "1px solid rgba(200,169,110,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div className="font-display" style={{ fontSize: 18, letterSpacing: "0.1em" }}>
          <span className="gold-gradient">AURUM</span>
          <span style={{ opacity: 0.3, fontSize: 11, marginLeft: 8 }}>BRASSERIE</span>
        </div>
        <div className="font-body" style={{ fontSize: 11, opacity: 0.3, letterSpacing: "0.1em" }}>
          © 2024 Aurum Brasserie. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Instagram", "Facebook", "Zomato"].map((s) => (
            <span
              key={s}
              className="font-body"
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "rgba(200,169,110,0.5)",
                cursor: "pointer",
                transition: "color 0.3s",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => (e.target.style.color = "#c8a96e")}
              onMouseLeave={e => (e.target.style.color = "rgba(200,169,110,0.5)")}
            >
              {s}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}