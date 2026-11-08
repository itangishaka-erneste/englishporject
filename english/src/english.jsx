import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import a from "./assets/a.jpg";
import b from "./assets/b.jpg";
import c from "./assets/c.jpg";
import d from "./assets/d.jpg";
import e from "./assets/e.jpg";
import f from "./assets/f.jpg";
import g from "./assets/g.jpg";
import h from "./assets/h.jpg";

/* Images live in  src/assets/  (a.jpg ... h.jpg) and are imported above */
const NAVY = "#041640", GREEN = "#19D26B", UI = "#06235F";
const avatar = (c1, c2) => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='200' height='200' fill='url(#g)'/><circle cx='100' cy='78' r='38' fill='#fff' fill-opacity='.92'/><path d='M28 200c0-46 32-74 72-74s72 28 72 74z' fill='#fff' fill-opacity='.92'/></svg>`);
const FONTS = ["Outfit", "Nunito Sans", "Playfair Display", "Lora", "Montserrat", "Space Grotesk", "Caveat"];
const PICS = [a, b, c, d, e, f, g, h];

const uid = () => Math.random().toString(36).slice(2, 9);
const txt = (text, x, y, w, o = {}) => ({ id: uid(), type: "text", text, x, y, w, font: "Nunito Sans", size: 28, color: "#ffffff", weight: 400, italic: false, align: "left", ...o });
const img = (src, x, y, w, h, o = {}) => ({ id: uid(), type: "image", src, x, y, w, h, fit: "cover", circle: false, ...o });
const box = (x, y, w, h, color) => ({ id: uid(), type: "shape", x, y, w, h, color });

const topic = (title, para, cap, pic, flip) => {
  const x = flip ? 650 : 70;
  return {
    id: uid(), bg: { color: NAVY, img: pic, dim: 1, flip },
    els: [
      box(x, 70, 90, 8, GREEN),
      txt(title, x, 92, 560, { font: "Outfit", size: 36, weight: 800, color: GREEN }),
      txt(para, x, 268, 560, { size: 19 }),
      txt("Image: " + cap, flip ? 70 : 700, 692, 510, { size: 14, italic: true, color: NAVY, shadow: false, align: flip ? "left" : "right" }),
    ],
  };
};

const refsSlide = (n, text) => ({ id: uid(), bg: { color: NAVY, img: "", dim: 0 }, els: [
  box(70, 60, 90, 8, GREEN),
  txt("References (" + n + " of 4)", 70, 82, 900, { font: "Outfit", size: 40, weight: 800, color: GREEN }),
  txt(text, 70, 150, 1140, { size: 17 }),
] });

const members = [["Keza Nadia", "KN", "#19D26B", "#0B5A8F"], ["Tuyishime Esther", "TE", "#2D7FF9", "#19D26B"], ["Itangishaka Erneste", "IE", "#0B5A8F", "#2D7FF9"], ["Mutabazi Queen Peace", "MQ", "#19D26B", "#2D7FF9"], ["Umumararungu Sandrine Joana", "US", "#2D7FF9", "#0B5A8F"]];

const START = [
  { id: uid(), bg: { color: NAVY, img: a, dim: 0.88, full: true }, els: [
    box(520, 128, 240, 8, GREEN),
    txt("Globalization and Global Citizenship", 90, 40, 1100, { font: "Outfit", size: 56, weight: 800, align: "center", color: GREEN }),
    txt("Group 6 · MSII · S5 · English", 90, 168, 1100, { size: 28, align: "center", color: "#8FF0B8" }),
    ...members.flatMap(([n, ini, c1, c2], i) => {
      const x = 59 + i * 238;
      return [img(avatar(c1, c2), x + 30, 270, 150, 150, { circle: true, label: ini }),
        txt(n, x, 440, 210, { font: "Outfit", size: 22, weight: 700, align: "center" })];
    }),
  ] },
  topic("How globalization connects Rwanda to the world",
    "Globalization means that countries are becoming more closely linked through trade, money, technology, travel and ideas (International Monetary Fund [IMF], 2002). Rwanda is small and landlocked, yet it is well connected. The Kigali Convention Centre, shown here, is a meeting place for the world. In 2025 Rwanda hosted 165 international and regional events that brought in 61,888 delegates, which is 17.3 per cent more than the year before (New Times, 2026b). Each visitor shares ideas, spends money and takes the story of Rwanda home.",
    "Kigali Convention Centre at night.", a),
  topic("People, events and sport bring the world to Kigali",
    "Connections also come through tourism and sport. Rwanda welcomed 1.49 million visitors in 2025, up from 1.36 million in 2024, and tourism earned about US$685 million (New Times, 2026a). Big events such as the 2025 UCI Road World Championships and the FIFA Series in Kigali show Rwanda to audiences far away (KT Press, 2026). For us at ASYV, globalization is not far away. It is in the songs we stream, the phones we use and the visitors we meet around Rwamagana.",
    "Kigali Convention Centre at night.", a, true),
  topic("How Rwanda takes part in global trade",
    "Trade means buying and selling goods and services across borders. Rwanda mainly sells coffee, tea and minerals, together with horticultural products such as avocados, passion fruit, flowers and vegetables. Some farm goods are processed first, for example honey, canned tomatoes, French beans and macadamia nuts (U.S. International Trade Administration [ITA], n.d.). The picture shows fresh produce and the flag of Kenya, one of our East African neighbours. Selling to many countries helps farmers earn money and lets Rwanda buy what it cannot produce itself.",
    "Fresh produce and the Kenyan flag: a regional trade partner.", c),
  topic("New trading partners in Africa and Asia",
    "Rwanda’s trading partners are changing. Exports to China almost doubled, from US$83.7 million in 2024 to US$160.8 million in 2025 (New Times, 2026c). Closer to home, exports to the East African Community rose to about US$54.6 million in the last quarter of 2025, nearly twice the figure of a year earlier (Kamanzi, 2026). Trade with neighbours is steady because it is based on daily needs. One challenge remains: Rwanda sells mostly raw products with little added value, so it earns less than it could (United Nations Development Programme [UNDP], 2026b).",
    "Fresh produce and the Kenyan flag: a regional trade partner.", c, true),
  topic("Coffee and tea: income from the farm",
    "Agriculture is a major source of foreign income. In 2025 Rwanda’s coffee sector had its best harvest in six years: exports reached 23,860 tonnes of green coffee and earned more than US$148.6 million (AllAfrica, 2026). The national accounts show that export crops grew by 32 per cent in 2025, with coffee up 60 per cent and tea up 8 per cent (National Institute of Statistics of Rwanda [NISR], 2026). Tea, like the leaves in this picture, is sold through an auction system, so the money can arrive in a later quarter (AllAfrica, 2026).",
    "Freshly picked tea leaves.", b),
  topic("Tourism, events and the trade gap",
    "Services also earn foreign money. Tourism brought in US$685 million in 2025, and meetings and conferences alone earned US$94.7 million (New Times, 2026a, 2026b). Between November 2025 and January 2026, visitors spent about US$161.5 million, most of it by people arriving by air (Radar Africa, 2026). Still, Rwanda buys more than it sells. In the last quarter of 2025, imports were about US$1.54 billion, while domestic exports were about US$375 million (UNDP, 2026a). Adding value, such as roasting coffee at home, can narrow the gap.",
    "Freshly picked tea leaves.", b, true),
  topic("Sounds in trade vocabulary",
    "Clear pronunciation helps you sound confident when you present. Break long words into syllables: glo-bal-i-za-tion has five, and the main stress falls on the fourth, glo-bal-i-ZA-tion. The ending -tion is said like ‘shun’, as in transaction and population. Some trade words change stress when they change job. The nouns IM-port and EX-port stress the first syllable, but the verbs im-PORT and ex-PORT stress the second (Cambridge University Press, n.d.). Practise these in pairs and listen for the beat in each word.",
    "Globalization vocabulary study card.", d),
  topic("Spelling patterns and key trade words",
    "Spelling follows patterns that you can learn. Words with the ‘shun’ sound are usually spelled -tion, as in globalization, transaction and migration. British English often writes -ise (globalisation) while American English writes -ize (globalization). Both are accepted, but choose one and keep it the same on every slide (Cambridge University Press, n.d.). Learn these key words: tariff (a tax on imports), deficit (spending more than you earn), revenue (income), auction (a sale to the highest bidder) and citizen (a member of a country).",
    "Globalization vocabulary study card.", d, true),
  topic("How the unit is assessed in Rwanda",
    "Since 2015 Rwanda’s schools have used a competence-based curriculum. This means learners are assessed on what they can do with knowledge, skills and attitudes, not only on what they can remember (Nsengimana, 2021). The curriculum also weaves in cross-cutting issues such as peace and values, environment and sustainability, gender, inclusive education and financial education (Nsengimana, 2021). In this unit, that means you should explain globalization with examples from Rwanda, use the vocabulary correctly and connect ideas to real life.",
    "A student writing an assessment.", e),
  topic("Ways to show what you have learned",
    "Learners can show understanding in many ways: a written test or short essay, a spoken presentation like this one, a group project and questions in class. Teacher’s guides from the Rwanda Education Board end each unit with an end-unit assessment (Rwanda Education Board [REB], n.d.). To do well, give clear definitions, support ideas with facts and examples, cite your sources and answer questions honestly. If you do not know an answer, say that you will check and report back.",
    "A student writing an assessment.", e, true),
  topic("ICT: how technology joins Rwanda to the world",
    "Information and communication technology, or ICT, lets people trade without travelling. The banner in this photo reads ‘Rwanda Coding Academy: Leading Through Digital Innovation’, showing how young Rwandans are building digital skills. The Digital Ambassadors Programme, part of the Smart Rwanda Master Plan, aims to raise the digital literacy of five million citizens (Ministry of ICT and Innovation [MINICT], n.d.). UNCTAD (2023) notes that e-commerce is growing fast in Rwanda and can open regional and global markets, create jobs and improve living standards.",
    "Rwanda Coding Academy hackathon group.", f),
  topic("Opportunities and challenges of going online",
    "ICT also brings challenges. Internet use reached 38 per cent of Rwandans by mid-2025, but the cost of devices and data keeps many people offline (AllAfrica, 2025). Rwanda’s e-commerce strategy covers online trade for small businesses, payments, delivery and customer trust (Digital Watch Observatory, n.d.). The country also hopes to be a pioneer in applying the African Continental Free Trade Area protocol on digital trade (UNCTAD, 2024). A small seller with a phone can reach more buyers, but only if payments, delivery and trust all work well.",
    "Rwanda Coding Academy hackathon group.", f, true),
  topic("What is a global citizen?",
    "A global citizen feels part of the whole human family, not only of one village or country, and acts with respect and responsibility. UNESCO (2014) describes global citizenship education as helping learners understand world problems and take action for a fairer and more peaceful world. The sculpture in the picture shows people joining hands around a globe. In Rwandan schools similar ideas appear as cross-cutting issues such as peace and values education and environment and sustainability (Nsengimana, 2021).",
    "Sculpture of people around a globe.", g),
  topic("Why global citizenship helps us",
    "Global citizenship brings real advantages. It teaches respect for people of different cultures and beliefs, which makes teamwork easier in regional bodies and international projects. It opens chances to study, work and exchange ideas abroad. It also builds responsibility: Rwanda’s tourism approach, for example, aims to protect nature while earning income (Africa Briefing, 2026). As members of ASYV, Rwanda and the world, we can start by caring for our Village, respecting classmates and sharing what we learn.",
    "Sculpture of people around a globe.", g, true),
  topic("Rwanda is a multilingual country",
    "Rwanda has four official languages: Kinyarwanda, which is also the national language, together with English, French and Kiswahili. The 2022 census shows that more than 99.7 per cent of Rwandans speak Kinyarwanda, and about 77 per cent are literate in at least one official language. Since 2021 English has been the language of instruction, while the other languages are taught as subjects (UNESCO, n.d.). That is why many of us already use two or three languages every day.",
    "A team working together.", h),
  topic("How languages help in global trade",
    "Speaking a buyer’s language builds trust and makes deals easier. English connects Rwanda to global business, Kiswahili to East African markets, and French to neighbours such as the Democratic Republic of the Congo, which remains a leading export destination (UNDP, 2026a). In upper secondary school, students can choose language combinations such as English–French–Kinyarwanda or English–Kiswahili–Kinyarwanda (UNESCO, n.d.). Being multilingual can open careers in tourism, ICT, diplomacy and trade, because every extra language is another door to a new market.",
    "A team working together.", h, true),
  refsSlide(1, [
    "Africa Briefing. (2026). Rwanda tourism revenue hits $161m in 3 months. https://africabriefing.com/rwanda-tourism-revenue-hits-161m-in-3-months/",
    "AllAfrica. (2025, June 17). Central Africa: Rwanda reaches 38 percent internet penetration but faces cost hurdles. https://allafrica.com/stories/202506170578.html",
    "AllAfrica. (2026, June 23). Rwanda: Export crop production surges in Q1. https://allafrica.com/stories/202606230367.html",
    "Cambridge University Press. (n.d.). Cambridge dictionary. https://dictionary.cambridge.org",
    "Digital Watch Observatory. (n.d.). Rwanda. https://dig.watch/countries/rwanda",
    "International Monetary Fund. (2002). Globalization: Threat or opportunity? https://www.imf.org",
    "Kamanzi, S. (2026, March 18). Rwanda sends nearly double exports to EAC neighbors, highest ever. KT Press. https://www.ktpress.rw/2026/03/rwanda-sends-nearly-double-exports-to-eac-neighbors-highest-ever/",
  ].join("\n\n")),
  refsSlide(2, [
    "KT Press. (2026, April). How Rwanda conquered European football. https://www.ktpress.rw/2026/04/how-rwanda-conquered-european-football/",
    "Ministry of ICT and Innovation. (n.d.). Digital Ambassadors Programme. https://www.minict.gov.rw/projects/digital-ambassadors-program",
    "National Institute of Statistics of Rwanda. (2026). Gross domestic product 2025 annual report. https://statistics.gov.rw/sites/default/files/documents/2026-03/GDP%202025.pdf",
    "New Times. (2026a). Rwanda’s tourism revenues hit Rwf1tn in 2025 - report. https://www.newtimes.co.rw/article/35238/news/tourism/rwandas-tourism-revenues-hit-rwf1tn-in-2025---report",
    "New Times. (2026b). Rwanda reaps nearly Rwf140bn from hosting meetings, events. https://www.newtimes.co.rw/article/35255/news/tourism/rwanda-reaps-nearly-rwf140bn-from-hosting-meetings-events",
    "New Times. (2026c). Exports to China surge 92% as demand rises. https://www.newtimes.co.rw/article/35568/news/economy/exports-to-china-surge-92-as-demand-rises",
    "Nsengimana, V. (2021). Implementation of competence-based curriculum in Rwanda: Opportunities and challenges. Rwandan Journal of Education, 5(1). https://core.ac.uk/download/478456765.pdf",
  ].join("\n\n")),
  refsSlide(3, [
    "Radar Africa. (2026). Rwanda earns $161M from tourism in 90 days [Infographic]. Source: Business Insider Africa.",
    "Rwanda Education Board. (n.d.). Creative arts teacher’s guide, Primary 3. https://elearning.reb.rw/mod/resource/view.php?id=4240",
    "United Nations Conference on Trade and Development. (2023). Towards an e-commerce strategy for Rwanda. https://unctad.org/publication/towards-e-commerce-strategy-rwanda",
    "United Nations Conference on Trade and Development. (2024). Contribution by Rwanda to the Intergovernmental Group of Experts on E-commerce and the Digital Economy. https://unctad.org/node/44818",
    "United Nations Development Programme. (2026a). Sector deep-dive note. https://www.undp.org/sites/g/files/zskgke326/files/2026-04/sector_deep_dive_note_0.pdf",
    "United Nations Development Programme. (2026b). Analytical note. https://www.undp.org/sites/g/files/zskgke326/files/2026-05/analytical_note.pdf",
  ].join("\n\n")),
  refsSlide(4, [
    "UNESCO. (2014). Global citizenship education: Preparing learners for the challenges of the 21st century. https://www.unesco.org",
    "UNESCO. (n.d.). Kinyarwanda in Rwanda. World Atlas of Languages. https://en.wal.unesco.org/countries/rwanda/languages/kinyarwanda-2",
    "U.S. International Trade Administration. (n.d.). Rwanda agriculture sector. https://trade.gov/country-commercial-guides/rwanda-agriculture-sector",
  ].join("\n\n")),
  { id: uid(), bg: { color: NAVY, img: a, dim: 0.72, full: true }, els: [
    txt("Thank you!", 90, 220, 1100, { font: "Outfit", size: 130, weight: 800, align: "center", color: GREEN }),
    box(540, 400, 200, 8, GREEN),
    txt("Congratulations to all of us · Group 6 · Questions are welcome", 90, 440, 1100, { size: 30, align: "center" }),
  ] },
];

/* ---------- Scale context + Stage ---------- */
const ScaleCtx = createContext(1);
function Stage({ children, className = "" }) {
  const ref = useRef(null);
  const [k, setK] = useState(0.5);
  useEffect(() => {
    const fit = () => ref.current && setK(Math.min(ref.current.clientWidth / 1280, ref.current.clientHeight / 720));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={"flex items-center justify-center overflow-hidden " + className}>
      <div style={{ width: 1280 * k, height: 720 * k }} className="relative shadow-xl overflow-hidden rounded-lg">
        <div style={{ width: 1280, height: 720, transform: `scale(${k})`, transformOrigin: "top left" }}>
          <ScaleCtx.Provider value={k}>{children}</ScaleCtx.Provider>
        </div>
      </div>
    </div>
  );
}

/* ---------- One element (text / image / shape) ---------- */
function Elem({ el, i, live, selected, onSel, onChange, animate }) {
  const k = useContext(ScaleCtx);
  const [editing, setEditing] = useState(false);
  const [bad, setBad] = useState(false);
  const tRef = useRef(null);
  useEffect(() => { setBad(false); }, [el.src]);
  useEffect(() => { if (editing && tRef.current) { tRef.current.focus(); } }, [editing]);

  const drag = (e, mode) => {
    if (!live || editing) return;
    e.stopPropagation(); onSel(el.id);
    const sx = e.clientX, sy = e.clientY, o = { ...el };
    const mv = (ev) => {
      const dx = (ev.clientX - sx) / k, dy = (ev.clientY - sy) / k;
      if (mode === "move") onChange(el.id, { x: Math.round(o.x + dx), y: Math.round(o.y + dy) });
      else onChange(el.id, { w: Math.max(40, Math.round(o.w + dx)), ...(el.type !== "text" ? { h: Math.max(20, Math.round(o.h + dy)) } : {}) });
    };
    const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
  };

  const base = {
    position: "absolute", left: el.x, top: el.y, width: el.w, height: el.type === "text" ? "auto" : el.h,
    outline: selected && live ? `${2 / k}px solid #4C84FF` : "none", pointerEvents: live ? "auto" : "none",
    animation: !animate ? "none" : el.type === "shape" ? `grow .8s ${0.1 + i * 0.12}s ease-out both, glow 2.6s ${1 + i * 0.1}s ease-in-out infinite` : el.type === "text" ? "none" : `up .7s ${0.1 + i * 0.12}s ease-out both`, transformOrigin: "left center", touchAction: "none",
  };
  const handle = selected && live && !editing && (
    <div onPointerDown={(e) => drag(e, "size")} style={{ position: "absolute", right: -9 / k, bottom: -9 / k, width: 18 / k, height: 18 / k, background: "#fff", border: `${2 / k}px solid #4C84FF`, borderRadius: "50%", cursor: "nwse-resize" }} />
  );

  if (el.type === "shape") return (
    <div style={{ ...base, background: el.color, borderRadius: 6, cursor: "move" }} onPointerDown={(e) => drag(e, "move")}>{handle}</div>
  );

  if (el.type === "image") {
    const show = el.src && !bad;
    return (
      <div style={{ ...base, cursor: "move" }} onPointerDown={(e) => drag(e, "move")}>
        <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: el.circle ? "50%" : (el.radius ?? 14), background: "#2A4A99", border: el.circle ? `5px solid ${GREEN}` : "none", boxSizing: "border-box", animation: animate && el.circle ? `float 4s ${i * 0.4}s ease-in-out infinite` : "none" }}>
          {show ? <img src={el.src} alt="" draggable={false} onError={() => setBad(true)} style={{ width: "100%", height: "100%", objectFit: el.fit }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8FF0B8", fontFamily: "Outfit", fontWeight: 800, fontSize: Math.min(el.w, el.h) / 3 }}>{el.label || "Image"}</div>}
        </div>
        {handle}
      </div>
    );
  }

  return (
    <div style={base} onPointerDown={(e) => drag(e, "move")} onDoubleClick={() => live && setEditing(true)}>
      <div ref={tRef} contentEditable={editing} suppressContentEditableWarning
        onBlur={(e) => { if (editing) { setEditing(false); onChange(el.id, { text: e.currentTarget.innerText }); } }}
        style={{ fontFamily: `'${el.font}', sans-serif`, fontSize: el.size, color: el.color, fontWeight: el.weight, fontStyle: el.italic ? "italic" : "normal", textAlign: el.align, lineHeight: 1.4, textShadow: el.shadow === false ? "none" : "0 1px 8px rgba(0,0,0,.45)", whiteSpace: "pre-wrap", cursor: editing ? "text" : "move", outline: "none", padding: 2, userSelect: editing ? "text" : "none" }}>
        {animate && !live ? el.text.split("\n").map((l, j) => <div key={j} style={{ animation: `up .6s ${0.3 + i * 0.12 + j * 0.2}s ease-out both` }}>{l.length > 140 ? l.split(/(?<=\.)\s/).map((q, k) => <span key={k} style={{ animation: `fade .8s ${0.6 + k * 0.7}s ease-out both` }}>{q} </span>) : l || "\u00A0"}</div>) : el.text}
      </div>
      {handle}
    </div>
  );
}

/* ---------- Curved blue-and-white background ---------- */
const BUBBLES = [[90, 600, 16, 8], [260, 640, 9, 11], [430, 620, 13, 9], [60, 330, 8, 12], [520, 470, 11, 10], [200, 220, 15, 13], [380, 120, 9, 14]];
function Deco({ b, animate }) {
  const split = b.img && !b.full;
  const on = (css) => (animate ? { animation: css } : {});
  const cx = split ? 0 : 1280;
  return (
    <svg width="1280" height="720" viewBox="0 0 1280 720" style={{ position: "absolute", inset: 0, pointerEvents: "none", transform: b.flip ? "scaleX(-1)" : "none" }}>
      {split && (<>
        <path d="M0 0 H690 C610 200 780 520 650 720 H0 Z" fill={b.color} />
        <path d="M704 0 C624 200 794 520 664 720" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" style={animate ? { strokeDasharray: 1200, animation: "draw 1.8s ease-out both" } : {}} />
        <path d="M728 0 C648 200 818 520 688 720" fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round" style={animate ? { strokeDasharray: 1200, animation: "draw 2.2s .3s ease-out both" } : {}} />
      </>)}
      <g style={on("drift 9s ease-in-out infinite alternate")}>
        <circle cx={cx} cy="0" r="240" fill="#fff" fillOpacity=".06" />
        <circle cx={cx} cy="0" r="160" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" />
        <circle cx={split ? 0 : 0} cy="720" r="120" fill="#3D7BFF" fillOpacity=".25" />
      </g>
      {animate && BUBBLES.map(([x, y, r, d], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#fff" fillOpacity=".18" style={{ animation: `bubble ${d}s ${i * 0.8}s ease-in infinite` }} />
      ))}
      <g style={on("wave 7s ease-in-out infinite alternate")}>
        <path d="M-100 650 C100 620 300 680 500 650 S900 620 1100 650 S1300 680 1400 650 V740 H-100Z" fill="#3D7BFF" fillOpacity=".5" />
      </g>
      <g style={on("wave2 9s ease-in-out infinite alternate")}>
        <path d="M-100 672 C120 642 320 702 520 672 S920 642 1120 672 S1320 702 1400 672 V740 H-100Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/* ---------- One slide ---------- */
function SlideView({ slide, live, sel, onSel, onChange, animate }) {
  const b = slide.bg;
  return (
    <div style={{ width: 1280, height: 720, position: "relative", overflow: "hidden", background: b.color }} onPointerDown={() => live && onSel(null)}>
      {b.img && <img src={b.img} alt="" draggable={false} onError={(e) => (e.currentTarget.style.display = "none")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transformOrigin: b.flip ? "20% 50%" : "80% 50%", animation: animate ? `${b.flip ? "revealL" : "reveal"} 1.4s ease-out both, kb 18s ease-out both` : "none" }} />}
      {b.img && (b.full || b.curves === false) && <div style={{ position: "absolute", inset: 0, opacity: b.dim, background: b.full ? b.color : `linear-gradient(${b.flip ? 270 : 90}deg, ${b.color} 0%, ${b.color} 44%, ${b.color}00 62%)` }} />}
      {b.curves !== false && <Deco b={b} animate={animate} />}
      {slide.els.map((el, i) => (
        <Elem key={el.id} el={el} i={i} live={live} animate={animate} selected={sel === el.id} onSel={onSel} onChange={onChange} />
      ))}
    </div>
  );
}

/* ---------- App ---------- */
const readFile = (file, cb) => { const r = new FileReader(); r.onload = () => cb(r.result); r.readAsDataURL(file); };
const enc = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o))));
const dec = (s) => JSON.parse(decodeURIComponent(escape(atob(s))));

export default function English() {
  const [slides, setSlides] = useState(() => {
    try { if (location.hash.startsWith("#d=")) return dec(location.hash.slice(3)); } catch (e) { /* use default */ }
    return START;
  });
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [present, setPresent] = useState(false);
  const [panel, setPanel] = useState(null); // "bg" | "share"
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef(null);
  const fileMode = useRef(null);

  const s = slides[Math.min(cur, slides.length - 1)];
  const el = s.els.find((e) => e.id === sel);
  const setS = (fn) => setSlides((a) => a.map((x, i) => (i === cur ? fn(x) : x)));
  const change = (id, p) => setS((x) => ({ ...x, els: x.els.map((e) => (e.id === id ? { ...e, ...p } : e)) }));
  const setBg = (p) => setS((x) => ({ ...x, bg: { ...x.bg, ...p } }));
  const addEl = (e) => { setS((x) => ({ ...x, els: [...x.els, e] })); setSel(e.id); };
  const delEl = () => { setS((x) => ({ ...x, els: x.els.filter((e) => e.id !== sel) })); setSel(null); };
  const order = (d) => setS((x) => {
    const i = x.els.findIndex((e) => e.id === sel), j = d > 0 ? x.els.length - 1 : 0, a = [...x.els];
    const [m] = a.splice(i, 1); a.splice(j, 0, m); return { ...x, els: a };
  });
  const go = (d) => { setCur((c) => Math.max(0, Math.min(slides.length - 1, c + d))); setSel(null); };
  const addSlide = () => {
    const n = { id: uid(), bg: { color: NAVY, img: "", dim: 0.78 }, els: [box(70, 110, 90, 8, GREEN), txt("New slide title", 70, 140, 700, { font: "Outfit", size: 52, weight: 800, color: GREEN }), txt("• Point one\n• Point two\n• Point three", 70, 360, 700)] };
    setSlides((a) => [...a.slice(0, cur + 1), n, ...a.slice(cur + 1)]); setCur(cur + 1); setSel(null);
  };
  const dupSlide = () => {
    const c = { ...s, id: uid(), els: s.els.map((e) => ({ ...e, id: uid() })) };
    setSlides((a) => [...a.slice(0, cur + 1), c, ...a.slice(cur + 1)]); setCur(cur + 1);
  };
  const delSlide = () => { if (slides.length > 1) { setSlides((a) => a.filter((_, i) => i !== cur)); setCur(Math.max(0, cur - 1)); setSel(null); } };
  const moveSlide = (d) => {
    const j = cur + d; if (j < 0 || j >= slides.length) return;
    setSlides((a) => { const b = [...a]; [b[cur], b[j]] = [b[j], b[cur]]; return b; }); setCur(j);
  };
  const pickFile = (mode) => { fileMode.current = mode; fileRef.current.value = ""; fileRef.current.click(); };
  const onFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    readFile(f, (src) => {
      if (fileMode.current === "add") addEl(img(src, 400, 200, 400, 300));
      else if (fileMode.current === "replace") change(sel, { src });
      else setBg({ img: src });
    });
  };
  const link = () => `${location.origin}${location.pathname}#d=${enc(slides.map((x) => ({ ...x, bg: { ...x.bg, img: (x.bg.img.startsWith("data:") && x.bg.img.length > 5000) ? "" : x.bg.img }, els: x.els.map((e) => (e.src && e.src.startsWith("data:") && e.src.length > 5000 ? { ...e, src: "" } : e)) })))}`;
  const copy = () => { navigator.clipboard?.writeText(link()); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const sendMail = () => { window.location.href = `mailto:${email}?subject=${encodeURIComponent("Presentation: Globalization and Global Citizenship")}&body=${encodeURIComponent("Open and edit our slides here:\n" + link())}`; };
  const startPresent = () => { setSel(null); setPresent(true); document.documentElement.requestFullscreen?.().catch(() => {}); };

  useEffect(() => {
    const key = (e) => {
      const t = e.target;
      if (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT") return;
      if (present) {
        if (["ArrowRight", " ", "PageDown"].includes(e.key)) go(1);
        if (["ArrowLeft", "PageUp"].includes(e.key)) go(-1);
        if (e.key === "Escape") { setPresent(false); document.fullscreenElement && document.exitFullscreen?.(); }
        return;
      }
      if (e.key === "F5") { e.preventDefault(); startPresent(); }
      if (sel) {
        const st = e.shiftKey ? 10 : 1;
        if (e.key === "Delete" || e.key === "Backspace") delEl();
        if (e.key === "ArrowLeft") change(sel, { x: el.x - st });
        if (e.key === "ArrowRight") change(sel, { x: el.x + st });
        if (e.key === "ArrowUp") change(sel, { y: el.y - st });
        if (e.key === "ArrowDown") change(sel, { y: el.y + st });
        if (e.key.startsWith("Arrow")) e.preventDefault();
      } else {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito+Sans:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@700&family=Lora:ital,wght@0,400;1,400&family=Montserrat:wght@400;700&family=Space+Grotesk:wght@400;700&family=Caveat:wght@600&display=swap');
    @keyframes up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}} @keyframes grow{from{transform:scaleX(0);opacity:0}to{transform:none;opacity:1}} @keyframes float{50%{transform:translateY(-12px)}} @keyframes kb{from{transform:scale(1)}to{transform:scale(1.1)}} @keyframes fade{from{opacity:0}to{opacity:1}} @keyframes pop{from{opacity:0;transform:translateY(-6px) scale(.97)}to{opacity:1;transform:none}} @keyframes draw{from{stroke-dashoffset:1200}to{stroke-dashoffset:0}} @keyframes drift{to{transform:translate(28px,20px)}} @keyframes bubble{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(-480px);opacity:0}} @keyframes wave{to{transform:translateX(-90px)}} @keyframes wave2{from{transform:translateX(-90px)}to{transform:translateX(0)}} @keyframes glow{50%{box-shadow:0 0 22px 4px rgba(25,210,107,.75)}} @keyframes reveal{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0)}} @keyframes revealL{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}
    @media (prefers-reduced-motion:reduce){*{animation-duration:.01s!important}}
  `;

  const B = ({ children, onClick, on, primary, title }) => (
    <button title={title} onMouseDown={(e) => e.preventDefault()} onClick={onClick}
      className="h-8 px-3 rounded-full text-sm font-semibold whitespace-nowrap transition active:scale-95"
      style={{ background: primary ? UI : on ? "#E3EBFF" : "#fff", color: primary ? "#fff" : on ? UI : "#1B2437", border: `1px solid ${primary ? UI : "#D8DEEB"}` }}>
      {children}
    </button>
  );
  const act = (fn) => () => { fn(); setPanel(null); };
  const It = ({ children, onClick, danger }) => (
    <button onMouseDown={(e) => e.preventDefault()} onClick={onClick} className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[#EEF3FF]" style={{ color: danger ? "#C62828" : "#1B2437" }}>{children}</button>
  );
  const dd = (id, label, body, w = 230) => (
    <div className="relative">
      <B on={panel === id} onClick={() => setPanel(panel === id ? null : id)}>{label} ▾</B>
      {panel === id && (
        <div className="absolute right-0 z-30 mt-2 rounded-2xl bg-white p-2 shadow-2xl" style={{ width: w, border: "1px solid #D8DEEB", animation: "pop .18s ease-out both" }}>{body}</div>
      )}
    </div>
  );
  const round = "h-8 rounded-full px-3 text-sm bg-white";
  const bd = { border: "1px solid #D8DEEB" };

  const formatBody = !el ? (
    <p className="px-3 py-2 text-sm" style={{ color: "#5B667D" }}>Click a text, image or line on the slide first.</p>
  ) : (
    <div className="p-1 space-y-2">
      {el.type === "text" && (<>
        <select className={round + " w-full"} style={bd} value={el.font} onChange={(e) => change(sel, { font: e.target.value })}>
          {FONTS.map((f) => <option key={f}>{f}</option>)}
        </select>
        <div className="flex items-center gap-1">
          <B onClick={() => change(sel, { size: Math.max(8, el.size - 2) })}>A−</B>
          <input type="number" className={round + " w-14 text-center"} style={bd} value={el.size} onChange={(e) => change(sel, { size: +e.target.value || 8 })} />
          <B onClick={() => change(sel, { size: el.size + 2 })}>A+</B>
          <input type="color" title="Text colour" className="h-8 w-9 rounded-full cursor-pointer" value={el.color} onChange={(e) => change(sel, { color: e.target.value })} />
        </div>
        <div className="flex gap-1 flex-wrap">
          <B on={el.weight >= 700} onClick={() => change(sel, { weight: el.weight >= 700 ? 400 : 800 })}><b>B</b></B>
          <B on={el.italic} onClick={() => change(sel, { italic: !el.italic })}><i>I</i></B>
          {["left", "center", "right"].map((a) => <B key={a} on={el.align === a} onClick={() => change(sel, { align: a })}>{a === "left" ? "⇤" : a === "center" ? "↔" : "⇥"}</B>)}
        </div>
      </>)}
      {el.type === "image" && (<>
        <div className="flex gap-1 flex-wrap">
          <B onClick={act(() => pickFile("replace"))}>Replace</B>
          <B on={el.fit === "contain"} onClick={() => change(sel, { fit: el.fit === "cover" ? "contain" : "cover" })}>{el.fit === "cover" ? "Fit" : "Fill"}</B>
          <B on={el.circle} onClick={() => change(sel, { circle: !el.circle })}>Circle</B>
        </div>
        <label className="flex items-center gap-2 text-xs px-1" style={{ color: "#5B667D" }}>Corners
          <input type="range" min="0" max="240" className="flex-1" value={el.radius ?? 14} onChange={(e) => change(sel, { radius: +e.target.value, circle: false })} />
        </label>
        <div className="flex gap-1">
          <B onClick={() => change(sel, { w: Math.round(el.w * 1.1), h: Math.round(el.h * 1.1) })}>Bigger</B>
          <B onClick={() => change(sel, { w: Math.round(el.w / 1.1), h: Math.round(el.h / 1.1) })}>Smaller</B>
        </div>
      </>)}
      {el.type === "shape" && <input type="color" title="Colour" className="h-8 w-12 rounded-full cursor-pointer" value={el.color} onChange={(e) => change(sel, { color: e.target.value })} />}
      <div className="flex gap-1 flex-wrap">
        <B onClick={() => change(sel, { x: Math.round((1280 - el.w) / 2) })}>Center</B>
        <B onClick={() => order(1)}>Front</B>
        <B onClick={() => order(-1)}>Back</B>
      </div>
      <It danger onClick={act(delEl)}>Delete</It>
    </div>
  );

  const bgBody = (
    <div className="p-1 space-y-3">
      <div className="flex items-center gap-2"><span className="text-sm w-14">Colour</span><input type="color" className="h-8 w-12 rounded-full cursor-pointer" value={s.bg.color} onChange={(e) => setBg({ color: e.target.value })} /></div>
      <div className="flex gap-1 flex-wrap">
        <B on={s.bg.curves !== false} onClick={() => setBg({ curves: s.bg.curves === false })}>Curves</B>
        <B onClick={act(() => pickFile("bg"))}>Upload image</B>
        <B onClick={() => setBg({ img: "" })}>No image</B>
      </div>
      {s.bg.full && <label className="flex items-center gap-2 text-xs" style={{ color: "#5B667D" }}>Tint<input type="range" min="0" max="1" step="0.05" className="flex-1" value={s.bg.dim} onChange={(e) => setBg({ dim: +e.target.value })} /></label>}
      <div className="grid grid-cols-4 gap-2">
        {PICS.map((p) => <img key={p} src={p} alt="" onClick={() => setBg({ img: p })} className="h-10 w-full object-cover rounded-lg cursor-pointer" style={bd} />)}
      </div>
    </div>
  );

  const shareBody = (
    <div className="p-2">
      <p className="text-sm mb-2" style={{ color: "#5B667D" }}>Anyone with the link can open it and edit their own copy.</p>
      <B primary onClick={copy}>{copied ? "Link copied" : "Copy link for everyone"}</B>
      <p className="text-sm font-semibold mt-3 mb-1">Send to a teammate</p>
      <input type="email" placeholder="name@email.com" className={round + " w-full mb-2"} style={bd} value={email} onChange={(e) => setEmail(e.target.value)} />
      <B onClick={sendMail}>Send by email</B>
      <p className="text-xs mt-3" style={{ color: "#5B667D" }}>Images uploaded from your device are not included in links.</p>
    </div>
  );

  if (present) return (
    <div className="fixed inset-0 z-50 bg-black">
      <style>{css}</style>
      <Stage className="w-full h-full"><div key={s.id} style={{ animation: "fade .5s both" }}><SlideView slide={s} animate /></div></Stage>
      <div className="absolute top-0 left-0 h-1 transition-all duration-500" style={{ width: `${((cur + 1) / slides.length) * 100}%`, background: GREEN }} />
      <button aria-label="Previous slide" className="absolute left-0 top-0 h-full w-1/5 opacity-0" onClick={() => go(-1)} />
      <button aria-label="Next slide" className="absolute right-0 top-0 h-full w-1/5 opacity-0" onClick={() => go(1)} />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 items-center opacity-0 hover:opacity-100 transition">
        <B onClick={() => go(-1)}>‹</B><span className="text-white text-sm px-2">{cur + 1} / {slides.length}</span><B onClick={() => go(1)}>›</B>
        <B primary onClick={() => { setPresent(false); document.fullscreenElement && document.exitFullscreen?.(); }}>Exit</B>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col" style={{ background: "#FFFFFF", color: "#1B2437", fontFamily: "'Nunito Sans', sans-serif" }}>
      <style>{css}</style>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      {panel && <div className="fixed inset-0 z-20" onMouseDown={() => setPanel(null)} />}

      <header className="h-11 px-3 flex items-center gap-2 shrink-0" style={{ borderBottom: "1px solid #E1E5EE" }}>
        <span className="font-bold text-sm truncate" style={{ fontFamily: "Outfit", maxWidth: 260 }}>Globalization and Global Citizenship</span>
        <div className="flex-1" />
        {dd("insert", "Insert", <>
          <It onClick={act(() => addEl(txt("New text", 400, 300, 400, { size: 36 })))}>Text</It>
          <It onClick={act(() => pickFile("add"))}>Image</It>
          <It onClick={act(() => addEl(box(500, 340, 240, 10, GREEN)))}>Line</It>
        </>, 170)}
        {dd("slide", "Slide", <>
          <It onClick={act(addSlide)}>New slide</It>
          <It onClick={act(dupSlide)}>Duplicate</It>
          <It onClick={act(() => moveSlide(-1))}>Move up</It>
          <It onClick={act(() => moveSlide(1))}>Move down</It>
          <It danger onClick={act(delSlide)}>Delete slide</It>
        </>, 180)}
        {dd("format", "Format", formatBody, 290)}
        {dd("bg", "Background", bgBody, 290)}
        {dd("share", "Share", shareBody, 300)}
        <B primary onClick={startPresent} title="F5">▶ Present</B>
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="w-44 shrink-0 overflow-y-auto p-3 space-y-3" style={{ borderRight: "1px solid #E1E5EE" }}>
          {slides.map((x, i) => (
            <div key={x.id} onClick={() => { setCur(i); setSel(null); }} className="flex gap-2 items-start cursor-pointer">
              <span className="text-xs pt-1 w-4" style={{ color: "#5B667D" }}>{i + 1}</span>
              <div className="rounded-lg overflow-hidden" style={{ width: 128, height: 72, outline: i === cur ? `3px solid ${UI}` : "1px solid #D8DEEB" }}>
                <div style={{ width: 1280, height: 720, transform: "scale(.1)", transformOrigin: "top left", pointerEvents: "none" }}>
                  <SlideView slide={x} />
                </div>
              </div>
            </div>
          ))}
        </aside>
        <main className="flex-1 min-w-0 flex flex-col">
          <Stage className="flex-1 p-5">
            <SlideView slide={s} live sel={sel} onSel={setSel} onChange={change} />
          </Stage>
          <div className="h-9 flex items-center justify-center gap-3 text-sm shrink-0">
            <B onClick={() => go(-1)}>‹</B><span>Slide {cur + 1} of {slides.length}</span><B onClick={() => go(1)}>›</B>
          </div>
        </main>
      </div>
    </div>
  );
}