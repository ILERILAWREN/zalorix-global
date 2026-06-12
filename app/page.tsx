"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Globe, Shield, MessageSquare, Heart, Bookmark, Share2, 
  Search, Bell, Filter, Sliders, ChevronRight, Zap, 
  TrendingUp, BarChart2, Radio, Send, CheckCircle, 
  Layers, MapPin, Briefcase, ShoppingBag, Grid, 
  Plus, X, MoreHorizontal, User, Sparkles, AlertCircle
} from "lucide-react";

// ==========================================
// SYSTEM TYPES & SPECIFICATIONS
// ==========================================
interface Theme {
  bg: string;
  surface: string;
  surfaceLight: string;
  border: string;
  accent: string;
  accentLight: string;
  success: string;
  danger: string;
  headText: string;
  bodyText: string;
  mutedText: string;
}

interface Listing {
  id: string;
  title: string;
  company: string;
  category: "Agriculture" | "Luxury Goods" | "Tech Hardware" | "Apparel" | "Design Services";
  scope: "Global" | "Nationwide" | "Local";
  price: string;
  location: string;
  verified: boolean;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  time: string;
  desc: string;
}

interface ChatMessage {
  id: string;
  sender: "vendor" | "user";
  text: string;
  time: string;
}

// ==========================================
// COMPLIANT PRE-TYPED CORE PILLS
// ==========================================
function Pill({ 
  bg, 
  color, 
  border, 
  children, 
  sm 
}: { 
  bg?: string; 
  color?: string; 
  border?: string; 
  children: React.ReactNode; 
  sm?: boolean; 
}) {
  return (
    <span style={{
      fontSize: sm ? 8 : 10,
      fontWeight: 700,
      letterSpacing: "0.06em",
      background: bg || "rgba(255,255,255,0.05)",
      color: color || "#ffffff",
      border: border ? `1px solid ${border}` : "1px solid rgba(255,255,255,0.1)",
      padding: sm ? "2px 6px" : "4px 10px",
      borderRadius: 6,
      whiteSpace: "nowrap",
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }}>
      {children}
    </span>
  );
}

// ==========================================
// DESIGN SYSTEM CONSTANTS (Ultra-Premium Dark)
// ==========================================
const T: Theme = {
  bg: "#03050c",
  surface: "#080c18",
  surfaceLight: "#0f162a",
  border: "#16223f",
  accent: "#2563eb",
  accentLight: "rgba(37, 99, 235, 0.15)",
  success: "#10b981",
  danger: "#f43f5e",
  headText: "#ffffff",
  bodyText: "#94a3b8",
  mutedText: "#475569"
};

const INITIAL_LISTINGS: Listing[] = [
  {
    id: "zal-1",
    title: "Premium Organic Cocoa Bulk Export",
    company: "Olam Agro Alliance",
    category: "Agriculture",
    scope: "Global",
    price: "$4,200 / Ton",
    location: "Lagos, Nigeria",
    verified: true,
    likes: 142,
    time: "5m ago",
    desc: "Grade-A certified organic cocoa beans ready for international shipping. Freight forwarding documentation fully prepared."
  },
  {
    id: "zal-2",
    title: "Custom Cut Luxury Kaftans & Senator Suits",
    company: "iLAWREN LUXE",
    category: "Apparel",
    scope: "Nationwide",
    price: "$350 / Unit",
    location: "Abuja, Nigeria",
    verified: true,
    likes: 89,
    time: "24m ago",
    desc: "Premium contemporary streetwear tailoring. Sourced using high-end materials with bespoke personalized accent stitching."
  },
  {
    id: "zal-3",
    title: "Enterprise Core Router Configurations",
    company: "Zalorix Tech Hub",
    category: "Tech Hardware",
    scope: "Global",
    price: "$12,850 Fixed",
    location: "Washington, D.C., USA",
    verified: true,
    likes: 64,
    time: "1h ago",
    desc: "High-throughput fiber optimized network architecture switches. Ready for immediate data-center rack deployment."
  },
  {
    id: "zal-4",
    title: "Brand Strategy & Interactive App Prototyping",
    company: "iCreativity Market",
    category: "Design Services",
    scope: "Global",
    price: "$5,000 / Retainer",
    location: "London, UK",
    verified: true,
    likes: 211,
    time: "2h ago",
    desc: "Full comprehensive Next.js frontend scaffolding blueprints and automated asset kits for luxury enterprise frameworks."
  }
];

const INITIAL_CHATS: Record<string, ChatMessage[]> = {
  "zal-1": [
    { id: "m1", sender: "vendor", text: "Hello! Thank you for checking out our Cocoa bulk export line. What volume are you looking to secure?", time: "16:10" }
  ],
  "zal-2": [
    { id: "m2", sender: "vendor", text: "Greetings! All iLAWREN LUXE bespoke options can be modified to your structural specs. Are you inquiring for retail or wholesale?", time: "15:44" }
  ]
};export default function ZalorixDashboard() {
  // --- Core Application States ---
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [matrixFilter, setMatrixFilter] = useState<"Global" | "Nationwide" | "Local">("Global");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatStreams, setChatStreams] = useState<Record<string, ChatMessage[]>>(INITIAL_CHATS);
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [liveAlerts, setLiveAlerts] = useState<string[]>([
    "3 new offers on your bulk cocoa broadcast",
    "Vendor responded to your apparel inquiry"
  ]);

  // --- Strict Next.js 16 Component Refs Fixed ---
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat panel safely
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, chatStreams]);

  // --- Social Actions & Interactive Micro-states ---
  const handleLike = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          isLiked: !item.isLiked
        };
      }
      return item;
    }));
  };

  const handleBookmark = (id: string) => {
    setListings(prev => prev.map(item => 
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    ));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChatId) return;

    const newMsg: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: "user",
      text: typedMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatStreams(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));
    setTypedMessage("");

    // Simulate reactive vendor feedback loop
    setTimeout(() => {
      const vendorReply: ChatMessage = {
        id: `m-vend-${Date.now()}`,
        sender: "vendor",
        text: "Understood. Our commercial dispatch team is reviewing your parameter requirements now.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatStreams(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), vendorReply]
      }));
    }, 1200);
  };

  // --- Analytical Matrix Calculators ---
  const filteredListings = listings.filter(item => {
    const matchesMatrix = item.scope === matrixFilter;
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMatrix && matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: T.bg, color: T.bodyText, minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      
      {/* HEADER MATRIX */}
      <header style={{ borderBottom: `1px solid ${T.border}`, backgroundColor: T.surface, padding: "12px 24px", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1400, margin: "0 auto", gap: 20 }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: T.accent, padding: 8, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe size={20} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: 16, fontWeight: 800, color: T.headText, letterSpacing: "0.03em" }}>ZALORIX</span>
              <span style={{ fontSize: 12, fontWeight: 400, color: T.accent, display: "block", marginTop: -2 }}>GLOBAL</span>
            </div>
          </div>

          {/* GLOBAL INTEGRATED SEARCH */}
          <div style={{ flex: 1, maxWidth: 500, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.mutedText }} />
            <input 
              type="text"
              placeholder="Search global broadcasts, tailors, or enterprise hardware..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "10px 16px 10px 40px", backgroundColor: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, color: T.headText, fontSize: 13, outline: "none" }}
            />
          </div>

          {/* NOTIFICATION HUB */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", cursor: "pointer", padding: 8, borderRadius: 8, border: `1px solid ${T.border}`, backgroundColor: T.bg }}>
              <Bell size={18} color={T.headText} />
              {liveAlerts.length > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, backgroundColor: T.danger, borderRadius: "50%" }} />}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 8, borderLeft: `1px solid ${T.border}` }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(45deg, #2563eb, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 12 }}>IL</div>
            </div>
          </div>

        </div>
      </header>

      {/* WORKSPACE APP BODY */}
      <div style={{ flex: 1, display: "flex", maxWidth: 1400, width: "100%", margin: "0 auto", position: "relative" }}>
        
        {/* LEFT COMPACT SIDEBAR */}
        <aside style={{ width: 240, borderRight: `1px solid ${T.border}`, padding: "24px 16px", display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.mutedText, letterSpacing: "0.08em", marginBottom: 12 }}>WORKSPACE HUB</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 6, background: T.accentLight, color: T.headText, border: "none", textAlign: "left", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                <Radio size={16} color="#3b82f6" /> Live Interaction Feed
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 6, background: "transparent", color: T.bodyText, border: "none", textAlign: "left", fontSize: 13, cursor: "pointer" }}>
                <Grid size={16} /> Zalorix Explorer
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 6, background: "transparent", color: T.bodyText, border: "none", textAlign: "left", fontSize: 13, cursor: "pointer" }}>
                <Layers size={16} /> My Broadcasts
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 6, background: "transparent", color: T.bodyText, border: "none", textAlign: "left", fontSize: 13, cursor: "pointer" }}>
                <BarChart2 size={16} /> Business Insights
              </button>
            </nav>
          </div>

          {/* REALTIME SYSTEM MONITOR */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: 14, borderRadius: 8, marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, backgroundColor: T.success, borderRadius: "50%" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: T.headText }}>ZALORIX SECURE CAP</span>
            </div>
            <p style={{ fontSize: 11, color: T.bodyText, lineHeight: "1.4", margin: 0 }}>Cryptographic operational protocols fully deployed. Inter-vendor interactions logged.</p>
          </div>
        </aside>

        {/* MAIN FEED MATRIX SPACE */}
        <main style={{ flex: 1, padding: 32, minWidth: 0 }}>
          
          {/* CONTROL MATRIX BLOCK */}
          <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: T.headText, margin: 0, letterSpacing: "-0.02em" }}>Live Interaction Feed</h1>
                <p style={{ fontSize: 13, color: T.bodyText, margin: "4px 0 0 0" }}>Interact, negotiate, and isolate nationwide and international commercial listings.</p>
              </div>

              {/* MATRIX EXPLORER TOGGLES */}
              <div style={{ display: "inline-flex", backgroundColor: T.surface, padding: 4, borderRadius: 8, border: `1px solid ${T.border}` }}>
                {(["Global", "Nationwide", "Local"] as const).map((scope) => (
                  <button
                    key={scope}
                    onClick={() => setMatrixFilter(scope)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 6,
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      backgroundColor: matrixFilter === scope ? T.accent : "transparent",
                      color: matrixFilter === scope ? "#ffffff" : T.bodyText,
                      transition: "all 0.2s ease"
                    }}
                  >
                    {scope === "Global" ? "Global Matrix" : scope === "Nationwide" ? "Nationwide Trade" : "Local Nodes"}
                  </button>
                ))}
              </div>
            </div>

            {/* QUICK CATEGORY HORIZONTAL FILTER */}
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
              {["All", "Agriculture", "Apparel", "Tech Hardware", "Design Services"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 20,
                    border: `1px solid ${activeCategory === cat ? T.accent : T.border}`,
                    backgroundColor: activeCategory === cat ? T.accentLight : T.surface,
                    color: activeCategory === cat ? "#fff" : T.bodyText,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    fontWeight: activeCategory === cat ? 600 : 400
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* RESPONSIVE INTERACTIVE GRID */}
          {filteredListings.length === 0 ? (
            <div style={{ border: `1px dashed ${T.border}`, padding: 48, borderRadius: 12, textAlign: "center", color: T.bodyText }}>
              <AlertCircle size={32} style={{ color: T.mutedText, marginBottom: 12 }} />
              <p style={{ margin: 0, fontSize: 14 }}>No commercial listings verified matching this filter subset matrix.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {filteredListings.map((l) => (
                <div 
                  key={l.id} 
                  style={{ 
                    backgroundColor: T.surface, 
                    border: `1px solid ${T.border}`, 
                    borderRadius: 12, 
                    padding: 20, 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 16,
                    transition: "transform 0.2s ease, border-color 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: T.accent, display: "block", marginBottom: 2 }}>{l.company.toUpperCase()}</span>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: T.headText, margin: 0, lineHeight: "1.3" }}>{l.title}</h3>
                    </div>
                    {l.verified && (
                      <Pill bg="rgba(16, 185, 129, 0.1)" color={T.success} border="rgba(16, 185, 129, 0.2)" sm={true}>
                        <CheckCircle size={10} /> Verified
                      </Pill>
                    )}
                  </div>

                  <p style={{ fontSize: 12, color: T.bodyText, margin: 0, flex: 1, lineHeight: "1.5" }}>{l.desc}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid rgba(255,255,255,0.03)`, borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                    <div>
                      <span style={{ fontSize: 10, color: T.mutedText, display: "block" }}>PROPOSED CAPITAL</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: T.headText }}>{l.price}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: T.bodyText, fontSize: 12 }}>
                      <MapPin size={12} color={T.accent} /> {l.location}
                    </div>
                  </div>

                  {/* TOUCHPOINTS PANEL */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <button 
                        onClick={() => handleLike(l.id)}
                        style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: l.isLiked ? T.danger : T.bodyText, backgroundColor: l.isLiked ? "rgba(244,63,94,0.08)" : "transparent" }}
                      >
                        <Heart size={14} fill={l.isLiked ? T.danger : "none"} />
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{l.likes}</span>
                      </button>

                      <button 
                        onClick={() => handleBookmark(l.id)}
                        style={{ border: "none", background: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: l.isBookmarked ? T.accent : T.bodyText }}
                      >
                        <Bookmark size={14} fill={l.isBookmarked ? T.accent : "none"} />
                      </button>
                    </div>

                    <button 
                      onClick={() => setActiveChatId(l.id)}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: `1px solid ${T.border}`, borderRadius: 6, backgroundColor: activeChatId === l.id ? T.accentLight : T.bg, color: T.headText, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >
                      <MessageSquare size={13} color="#3b82f6" /> Instant Inquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* SIDE NEGOTIATION CHAT PANEL */}
        {activeChatId && (
          <div style={{ width: 340, borderLeft: `1px solid ${T.border}`, backgroundColor: T.surface, display: "flex", flexDirection: "column", height: "calc(100vh - 61px)", position: "sticky", top: 61 }}>
            
            {/* PANEL HEADER */}
            <div style={{ padding: 16, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: T.bg }}>
              <div>
                <span style={{ fontSize: 10, color: T.accent, fontWeight: 700, letterSpacing: "0.05em", display: "block" }}>NEGOTIATION TERMINAL</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.headText }}>{listings.find(x => x.id === activeChatId)?.company}</span>
              </div>
              <button onClick={() => setActiveChatId(null)} style={{ border: "none", background: "none", color: T.bodyText, cursor: "pointer", padding: 4 }}>
                <X size={16} />
              </button>
            </div>

            {/* SCROLLABLE CHAT MESSAGES */}
            <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
              {(chatStreams[activeChatId] || []).map((msg) => (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "user" ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ 
                    padding: "10px 14px", 
                    borderRadius: 10, 
                    fontSize: 12, 
                    lineHeight: "1.4",
                    backgroundColor: msg.sender === "user" ? T.accent : T.surfaceLight, 
                    color: "#ffffff",
                    border: msg.sender === "user" ? "none" : `1px solid ${T.border}`
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: 9, color: T.mutedText, marginTop: 4, padding: "0 4px" }}>{msg.time}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* CHAT INPUT MATRIX */}
            <form onSubmit={handleSendMessage} style={{ padding: 14, borderTop: `1px solid ${T.border}`, backgroundColor: T.bg }}>
              <div style={{ display: "flex", gap: 8, position: "relative" }}>
                <input 
                  type="text"
                  placeholder="Propose terms, parameters..."
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  style={{ flex: 1, padding: "10px 12px", backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, color: T.headText, fontSize: 12, outline: "none" }}
                />
                <button type="submit" style={{ padding: "10px 14px", backgroundColor: T.accent, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Send size={13} />
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}