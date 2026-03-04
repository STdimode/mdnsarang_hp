import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import grainTexture from "figma:asset/1958ea6da85be219392f56400cece9696ea658a1.png";
import lightBeamBg from "figma:asset/f69b2aaacf2509efa17ba8dca6463bbd95be090d.png";
import churchSchoolBg from "figma:asset/7ee3a1c1b67d51d420eed6c7c16d6cba00571f24.png";
import churchSchoolBgNew from "figma:asset/7acbbd4f172fd930656727f49ee0b1b06dd9c4bd.png";
import heroNewImg from "figma:asset/1a5b641d77e8a3290c3ed6c10b957eca2abe9d88.png";
import prayingHandsImg from "figma:asset/1836b697e1673af2a2ce2503e57dd43c8006c5b4.png";

/* ─── images ─── */
import heroSlideImg from "figma:asset/c928059b5968d7fe6b03e6dc8000bd8013816286.png";

const HERO_IMAGES = [
  heroSlideImg,
];
const CARD1_IMG = "https://images.unsplash.com/photo-1730755525622-680fa18845d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXduJTIwc3VucmlzZSUyMHNvZnQlMjBza3klMjBtb3JuaW5nJTIwZ2xvd3xlbnwxfHx8fDE3NzI1Mzg2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CARD2_IMG = "https://images.unsplash.com/photo-1698953186103-d0e9f99abc4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHBhZ2VzJTIwd2FybSUyMGNhbmRsZWxpZ2h0fGVufDF8fHx8MTc3MjUzODMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CARD3_IMG = "https://images.unsplash.com/photo-1765620860582-f3bff18862ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHByYXllciUyMGhhbmRzJTIwd2FybSUyMGxpZ2h0fGVufDF8fHx8MTc3MjUzODUwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CHURCH_BG = "https://images.unsplash.com/photo-1545666215-c5fbc4a9f4fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBjYW5kbGVzJTIwYXRtb3NwaGVyaWN8ZW58MXx8fHwxNzcyNTI4Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1621341104121-d610c0dc4228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGFlc3RoZXRpYyUyMG1pbmltYWx8ZW58MXx8fHwxNzcyNTg0MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1772442363851-738a548f6c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHdhcm0lMjBhcmNoaXRlY3R1cmUlMjBzdW5saWdodHxlbnwxfHx8fDE3NzI1ODQyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1561896299-a7e2ffeca2e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHNhbmQlMjBkZXNlcnQlMjBkdW5lc3xlbnwxfHx8fDE3NzI1ODQxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1771039621800-fb28e227575c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHNvZnQlMjBsaWdodCUyMHdpbmRvdyUyMGN1cnRhaW58ZW58MXx8fHwxNzcyNTg0MzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGlubGVuJTIwZmFicmljJTIwdGV4dHVyZXxlbnwxfHx8fDE3NzI1ODQxODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1650527122326-0abd4c8c0f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGNvZmZlZSUyMGxhdHRlJTIwYXJ0JTIwbmV1dHJhbHxlbnwxfHx8fDE3NzI1ODQyNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

/* ─── SVG Icons ─── */
const LeafLogo = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2C7 2 3 6 3 11c0 4 2 7 4 8.5C8 20 10 20 11 20c1 0 3 0 4-0.5 2-1.5 4-4.5 4-8.5C19 6 15 2 11 2z" fill="#2eb872"/>
    <path d="M11 5v13M7 9c2 1 4 2 7 5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <line x1="1" y1="1" x2="21" y2="1"/>
    <line x1="1" y1="8" x2="21" y2="8"/>
    <line x1="1" y1="15" x2="21" y2="15"/>
  </svg>
);

/* Welcome icons */
const IconChurchIntro = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 6v8"/>
    <path d="M23.5 10h5"/>
    <path d="M13 24l13-10 13 10"/>
    <rect x="15" y="24" width="22" height="18"/>
    <rect x="22" y="32" width="8" height="10"/>
  </svg>
);
const IconWorshipGuide = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    {/* 펼쳐진 책 - 왼쪽 페이지 (라인만) */}
    <path d="M26 20C22 18 16 17 8 18l2 20c8-1 13 0 16 2V20z" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"/>
    {/* 펼쳐진 책 - 오른쪽 페이지 (라인만) */}
    <path d="M26 20c4-2 10-3 18-2l-2 20c-8-1-13 0-16 2V20z" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"/>
    {/* 책등 중심선 */}
    <path d="M26 20v20" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/>
    {/* 십자가 - 굵게 */}
    <line x1="26" y1="4" x2="26" y2="19" stroke="rgba(255,255,255,0.95)" strokeWidth="4"/>
    <line x1="20" y1="10" x2="32" y2="10" stroke="rgba(255,255,255,0.95)" strokeWidth="4"/>
  </svg>
);
const IconPeople = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="26" cy="14" r="5.5"/>
    <path d="M15 38c0-6.5 4.5-12 11-12s11 5.5 11 12"/>
    <circle cx="11" cy="19" r="4"/>
    <path d="M4 36c0-4.5 3.2-8.5 7-8.5 1.4 0 2.7.5 3.8 1.2"/>
    <circle cx="41" cy="19" r="4"/>
    <path d="M48 36c0-4.5-3.2-8.5-7-8.5-1.4 0-2.7.5-3.8 1.2"/>
  </svg>
);
const IconMap = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 14l12-5 14 5 12-5v28l-12 5-14-5-12 5V14z"/>
    <path d="M19 9v28"/>
    <path d="M33 14v28"/>
    <path d="M26 14c-3.5 0-6.5 3-6.5 6.5 0 5 6.5 11 6.5 11s6.5-6 6.5-11c0-3.5-3-6.5-6.5-6.5z" fill="rgba(255,255,255,0.85)"/>
    <circle cx="26" cy="20.5" r="2.5" fill="#1a2038" stroke="none"/>
  </svg>
);

/* Church school icons */
/* 교회학교: 새싹 아이콘 */
const IconInfant = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" strokeLinecap="round" strokeLinejoin="round">
    {/* 왼쪽 잎 */}
    <path d="M24 24C24 16 18 10 12 12C12 12 10 20 18 24" stroke="#222" strokeWidth="3.5" fill="none" />
    {/* 오른쪽 잎 */}
    <path d="M24 24C24 16 30 10 36 12C36 12 38 20 30 24" stroke="#222" strokeWidth="3.5" fill="none" />
    {/* 줄기 */}
    <path d="M24 24V36" stroke="#222" strokeWidth="3.5" />
    {/* 땅 라인 */}
    <path d="M14 38C17 35 20 34 24 34C28 34 31 35 34 38" stroke="#222" strokeWidth="3.5" fill="none" />
  </svg>
);
/* 차세대: 기도 손 아이콘 */
const IconChildren = () => (
  <img src={prayingHandsImg} alt="기도하는 손" width="48" height="48" style={{ objectFit: "contain" }} />
);
/* 장년세대: 계단+깃발 아이콘 */
const IconYouth = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" strokeLinecap="round" strokeLinejoin="round">
    {/* 3단 계단 */}
    <path d="M4 44H16V32H28V20H40V44H4Z" stroke="#222" strokeWidth="3.5" fill="none" />
    {/* 깃발 봉 */}
    <path d="M40 20V4" stroke="#222" strokeWidth="3.5" />
    {/* 깃발 */}
    <path d="M40 4L40 14L34 11L40 8" stroke="#222" strokeWidth="3.5" fill="none" />
  </svg>
);
/* 청년부(갈렙): 교제하는 사람들 아이콘 */
const IconYoungAdult = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#334" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* 왼쪽 사람 */}
    <circle cx="14" cy="14" r="4.5"/>
    <path d="M7 34c0-5 3-9 7-9s7 4 7 9"/>
    {/* 오른쪽 사람 */}
    <circle cx="34" cy="14" r="4.5"/>
    <path d="M27 34c0-5 3-9 7-9s7 4 7 9"/>
    {/* 가운데 하트(교제 상징) */}
    <path d="M24 26c-1.5-2.5-5-3 5 0s5 6 5 6 5-3 5-6-3.5-2.5-5 0z" fill="#334" stroke="none"/>
    {/* 연결 손 */}
    <path d="M18 28c2-1 4-1.5 6-1.5"/>
    <path d="M30 28c-2-1-4-1.5-6-1.5"/>
  </svg>
);

/* Arrow icon for cards */
const ArrowIcon = ({ color = "white" }: { color?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 11L11 1M11 1H3M11 1v8"/>
  </svg>
);

/* ─── FadeUp Component ─── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Gallery Carousel ─── */
const GALLERY_GAP = 20;
const N = GALLERY_IMAGES.length; // 6
const GALLERY_SLIDES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES]; // 18

function getVisibleCount(width: number) {
  if (width < 640) return 2;
  if (width < 900) return 3;
  return 5;
}

function GalleryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [idx, setIdx] = useState(N); // start at copy1 index=6
  const [anim, setAnim] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef(0);
  const autoplayEnabled = useRef(true);

  /* measure slide width + responsive visible count */
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const vc = getVisibleCount(cw);
    setVisibleCount(vc);
    const gap = cw < 480 ? 10 : GALLERY_GAP;
    setSlideW((cw - gap * (vc - 1)) / vc);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* responsive gap */
  const gap = (containerRef.current?.clientWidth ?? 1000) < 480 ? 10 : GALLERY_GAP;

  /* translateX calculation */
  const translateX = idx * (slideW + gap) - dragOffset;

  /* responsive image height */
  const imgHeight = visibleCount <= 2 ? 200 : 260;

  /* autoplay */
  useEffect(() => {
    const timer = setInterval(() => {
      if (autoplayEnabled.current) {
        setAnim(true);
        setIdx((p) => p + 1);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* infinite loop jump */
  const handleTransitionEnd = useCallback(() => {
    if (idx >= N * 2) {
      setAnim(false);
      setIdx((prev) => prev - N);
    } else if (idx < N) {
      setAnim(false);
      setIdx((prev) => prev + N);
    }
  }, [idx]);

  /* after jump (anim=false), wait 2 RAF then re-enable animation */
  useEffect(() => {
    if (!anim) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim(true);
        });
      });
    }
  }, [anim]);

  /* slide helpers */
  const slideNext = useCallback(() => { setAnim(true); setIdx((p) => p + 1); }, []);
  const slidePrev = useCallback(() => { setAnim(true); setIdx((p) => p - 1); }, []);

  /* mouse drag */
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    autoplayEnabled.current = false;
    setAnim(false);
    dragStartX.current = e.clientX;
    setDragOffset(0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  };
  const finishDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    autoplayEnabled.current = true;
    const threshold = slideW * 0.3;
    if (dragOffset < -threshold) {
      setAnim(true);
      setIdx((p) => p + 1);
    } else if (dragOffset > threshold) {
      setAnim(true);
      setIdx((p) => p - 1);
    } else {
      setAnim(true); // snap back
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, slideW]);

  /* touch drag (mobile) */
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    autoplayEnabled.current = false;
    setAnim(false);
    dragStartX.current = e.touches[0].clientX;
    setDragOffset(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - dragStartX.current);
  };
  const onTouchEnd = finishDrag;

  const activeDot = ((idx % N) + N) % N;

  const onDotClick = (i: number) => {
    setAnim(true);
    setIdx(N + i); // copy1 position
  };

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <FadeUp>
        <h2 style={{ fontSize: 32, fontWeight: 700, fontStyle: "italic", color: "#222", textAlign: "center", marginBottom: 32 }}>
          gallery
        </h2>
      </FadeUp>

      {/* Full-width carousel container */}
      <div
        ref={containerRef}
        style={{ overflow: "hidden", width: "100%", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", touchAction: "pan-y", padding: visibleCount <= 2 ? "0 16px" : 0 }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={finishDrag}
        onMouseLeave={finishDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: "flex",
            gap: gap,
            transform: `translateX(-${translateX}px)`,
            transition: anim ? "transform 0.5s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {GALLERY_SLIDES.map((src, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: slideW,
                height: imgHeight,
              }}
            >
              <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      {/* controls — arrows at far left/right, dots centered */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, padding: "0 16px" }}>
        {/* left arrow */}
        <button onClick={slidePrev} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <svg style={{ width: visibleCount <= 2 ? 60 : 160, height: 20 }} viewBox="0 0 160 20" fill="none" preserveAspectRatio="xMinYMid meet">
            <line x1="160" y1="10" x2="4" y2="10" stroke="#bbb" strokeWidth="1.2"/>
            <polyline points="12,3 4,10 12,17" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {Array.from({ length: N }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              style={{
                width: i === activeDot ? 20 : 8,
                height: 4,
                borderRadius: 0,
                background: i === activeDot ? "#4A90D9" : "#ccc",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* right arrow */}
        <button onClick={slideNext} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
          <svg style={{ width: visibleCount <= 2 ? 60 : 160, height: 20 }} viewBox="0 0 160 20" fill="none" preserveAspectRatio="xMaxYMid meet">
            <line x1="0" y1="10" x2="156" y2="10" stroke="#bbb" strokeWidth="1.2"/>
            <polyline points="148,3 156,10 148,17" stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════ MAIN APP ═══════════ */
export default function App() {
  const [heroIdx, setHeroIdx] = useState(0);

  const FONT = "'Noto Sans KR', sans-serif";
  const NAV = ["교회소개", "새가족안내", "다음세대(교회학교)", "갈렙청년부", "인터넷방송", "Mission 2030", "교회소식"];

  const welcomeCards = [
    { icon: <IconChurchIntro />, label: "교회소개" },
    { icon: <IconWorshipGuide />, label: "예배안내" },
    { icon: <IconPeople />, label: "섬기는사람들" },
    { icon: <IconMap />, label: "오시는길" },
  ];

  const churchSchoolCards = [
    { icon: <IconInfant />, title: "교회 학교", desc: "아이들이 말씀 안에서 믿음으로\n자라도록 돕는 부서입니다." },
    { icon: <IconChildren />, title: "차세대", desc: "하나님의 거룩함을 삶에 드러내며\n기도하는 공동체입니다." },
    { icon: <IconYouth />, title: "장년세대", desc: "처음오신분들부터 성숙한 제자도까지\n체계적으로 돕는 부서입니다." },
  ];

  return (
    <div style={{ fontFamily: FONT, overflowX: "hidden" }}>
      {/* ━━━ HEADER ━━━ */}
      <header
        className="fixed top-0 left-0 w-full z-50"
        style={{ background: "rgba(30,40,60,0.5)", height: 76 }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center gap-2">
            <LeafLogo />
            <span style={{ color: "white", fontSize: 23, fontWeight: 500 }}>목동늘사랑교회</span>
          </div>
          {/* nav */}
          <nav className="hidden md:flex items-center" style={{ gap: 48 }}>
            {["교회 안내", "교육 훈련", "선교", "자료실"].map((n) => (
              <a key={n} href="#" style={{ color: "white", fontSize: 20, fontWeight: 400, textDecoration: "none" }}>
                {n}
              </a>
            ))}
          </nav>
          {/* hamburger */}
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* ━━━ HERO ━━━ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 728 }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroNewImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              style={{
                width: i === heroIdx ? 28 : 10,
                height: 4,
                borderRadius: 0,
                background: i === heroIdx ? "white" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </section>

      {/* ━━━ WELCOME ━━━ */}
      <section style={{ background: "#1a2038", padding: "60px 0 56px" }}>
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          <FadeUp>
            <div>
              <div style={{ width: 32, height: 2, background: "rgba(255,255,255,0.3)", marginBottom: 16 }} />
              <h2 style={{ fontSize: 32, fontWeight: 700, fontStyle: "italic", color: "#4A90D9", marginBottom: 14 }}>
                welcome
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 400 }}>
                어제와 오늘, 내일 함께 그리스도의 지체로<br />
                살아가는 교회, 목동늘사랑교회에 오신 것을 환영합니다.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <div className="flex flex-wrap gap-3">
              {welcomeCards.map((c) => (
                <div
                  key={c.label}
                  style={{
                    border: "none",
                    width: 130,
                    height: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    cursor: "pointer",
                    background: "transparent",
                    borderRadius: 0,
                  }}
                >
                  <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.icon}
                  </div>
                  <span style={{ fontSize: 19, color: "rgba(255,255,255,0.9)" }}>{c.label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ THREE CARDS ━━━ */}
      <section style={{ background: "white", paddingTop: 60, paddingBottom: 70 }}>
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3" style={{ gap: 30 }}>
          {/* Card 1 */}
          <FadeUp delay={0}>
            <div
              className="relative overflow-hidden group/arrow"
              style={{
                aspectRatio: "16/9",
                borderRadius: 0,
                backgroundImage: `url(${CARD1_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,25,0.15), rgba(5,10,20,0.6))" }} />
              <div className="absolute" style={{ bottom: 20, left: 22 }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: 0.5 }}>예배영상</span>
                <h3 style={{ color: "white", fontSize: 24, fontWeight: 700, marginTop: 4 }}>설교 제목입니다.</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 6 }}>2026.03.01</p>
              </div>
            </div>
          </FadeUp>

          {/* Card 2 */}
          <FadeUp delay={120}>
            <div
              className="relative overflow-hidden group/arrow"
              style={{
                aspectRatio: "16/9",
                borderRadius: 0,
                backgroundImage: `url(${CARD2_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,25,0.15), rgba(5,10,20,0.6))" }} />
              <div className="absolute" style={{ bottom: 20, left: 22 }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: 0.5 }}>예배영상</span>
                <h3 style={{ color: "white", fontSize: 24, fontWeight: 700, marginTop: 4 }}>설교 제목입니다.</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 6 }}>2026.03.01</p>
              </div>
            </div>
          </FadeUp>

          {/* Card 3 */}
          <FadeUp delay={240}>
            <div
              className="relative overflow-hidden group/arrow"
              style={{
                aspectRatio: "16/9",
                borderRadius: 0,
                backgroundImage: `url(${CARD3_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,30,80,0.15), rgba(10,20,60,0.6))" }} />
              <div className="absolute" style={{ bottom: 20, left: 22 }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: 0.5 }}>예배영상</span>
                <h3 style={{ color: "white", fontSize: 24, fontWeight: 700, marginTop: 4 }}>설교 제목입니다.</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 6 }}>2026.03.01</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ CHURCH SCHOOL ━━━ */}
      <section
        className="relative"
        style={{
          padding: "70px 0",
        }}
      >
        {/* blurred background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-4" style={{
            backgroundImage: `url(${churchSchoolBgNew})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} />
        </div>
        {/* dark overlay for text readability */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)", pointerEvents: "none" }} />
        <div className="relative max-w-[1440px] mx-auto px-8 text-center">
          <FadeUp>
            <h2 style={{ color: "white", fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              다음세대를 위한 목동늘사랑교회 교회학교
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 40 }}>
              다음세대가 신앙 안에서 건강하게 자라가도록 돕는 공동체입니다.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto" style={{ maxWidth: 1200 }}>
            {churchSchoolCards.map((c, i) => (
              <FadeUp key={c.title} delay={i * 120}>
                <div
                  style={{
                    background: "white",
                    padding: "40px 26px 34px",
                    borderRadius: 0,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {c.icon}
                    </div>
                  </div>
                  <h4 style={{ fontSize: 24, fontWeight: 700, color: "#222", marginBottom: 8 }}>{c.title}</h4>
                  <p style={{ fontSize: 16, color: "#777", whiteSpace: "pre-line", lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━ */}
      <section style={{ padding: "60px 0 70px", background: "white" }}>
        <GalleryCarousel />
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{ background: "#000000", padding: "40px 0 36px" }}>
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p style={{ color: "rgba(255,255,255,0.95)", fontSize: 17, marginBottom: 4 }}>대한예수교장로회 디모데교회</p>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, marginBottom: 12 }}>김성명 담임목사</p>
            <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.25)", marginBottom: 12 }} />
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7 }}>
              03173 서울 종로구 새문안로5길 19 로얄빌딩 602호<br />
              Tel : 02-393-7133 &nbsp;&nbsp;Fax : 02-6007-1697
            </p>
          </div>
          <div className="flex items-start md:items-end md:text-right">
            <div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16 }}>
                Copyright &copy; 2021 디모데교회
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
                All rights reserved. Designed by ㈜ 스데반정보.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}