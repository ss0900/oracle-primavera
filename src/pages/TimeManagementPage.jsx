import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SectionIndicator from '../components/SectionIndicator';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: 'hero', label: 'Time Management' },
  { id: 'menu', label: '메뉴' },
  { id: 'definition', label: '정의' },
  { id: 'necessity', label: '필요성' },
  { id: 'goals', label: '목표' },
  { id: 'methods', label: '방법' },
  { id: 'advantages', label: 'Primavera' },
  { id: 'comparison', label: 'Tool 비교' },
  { id: 'ppm-eppm', label: 'PPM vs EPPM' },
];

// Menu items for the navigation section
const subMenuItems = [
  {
    id: 'overview',
    title: '개요',
    image: 'https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'advantages',
    title: '장점',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'cases',
    title: '적용 사례',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

function TimeManagementPage() {
  const { sectionId, subId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const menuSectionRef = useRef(null);
  const definitionSectionRef = useRef(null);
  const necessitySectionRef = useRef(null);
  const goalsSectionRef = useRef(null);
  const methodsSectionRef = useRef(null);
  const advantagesSectionRef = useRef(null);
  const comparisonSectionRef = useRef(null);
  const ppmEppmSectionRef = useRef(null);

  // Animation refs for various sections
  const definitionTitleRef = useRef(null);
  const definitionBoxRef = useRef(null);
  const definitionTextRef = useRef(null);
  const iconsRef = useRef([]);
  const arrowLeftRef = useRef(null);
  const shieldRef = useRef(null);
  const arrowRightRef = useRef(null);
  const resultsRef = useRef([]);
  const necessityTitleRef = useRef(null);
  const necessityCardsRef = useRef([]);
  const goalsTitleRef = useRef(null);
  const goalsSegmentsRef = useRef([]);
  const goalsCenterRef = useRef(null);
  const goalsLabelsRef = useRef([]);
  const goalsCalloutRef = useRef(null);
  const methodsTitleRef = useRef(null);
  const methodsForwardArrowRef = useRef(null);
  const methodsBackwardArrowRef = useRef(null);
  const methodsChevronsRef = useRef([]);
  const titleRef = useRef(null);
  const hubRef = useRef(null);
  const boxesRef = useRef([]);
  const connectLinesRef = useRef([]);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const comparisonTitleRef = useRef(null);
  const comparisonTableRef = useRef(null);
  const comparisonConclusionRef = useRef(null);
  const comparisonRowsRef = useRef([]);
  const ppmEppmTitleRef = useRef(null);
  const ppmEppmCardsRef = useRef([]);
  const ppmEppmDividerRef = useRef(null);
  const ppmEppmIconsRef = useRef([]);
  const ppmEppmBulletsRef = useRef([]);
  const ppmEppmConclusionRef = useRef(null);

  // PPM vs EPPM drag-to-resize state
  const [leftRatio, setLeftRatio] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartRatioRef = useRef(50);

  // 3D Tilt effect handler
  const handleCardMouseMove = (e, cardElement) => {
    if (!cardElement || prefersReducedMotion) return;
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleCardMouseLeave = (cardElement) => {
    if (!cardElement) return;
    cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    dragStartXRef.current = e.clientX;
    dragStartRatioRef.current = leftRatio;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStartXRef.current;
      const containerWidth =
        ppmEppmSectionRef.current?.querySelector('.tm-ppm-eppm-grid')
          ?.offsetWidth || 1000;
      
      const deltaRatio = (deltaX / containerWidth) * 100;
      let newRatio = dragStartRatioRef.current + deltaRatio;

      newRatio = Math.max(20, Math.min(80, newRatio));
      setLeftRatio(newRatio);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Navigate to section
  const scrollToSection = useCallback((sectionId) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;

    const panels = gsap.utils.toArray('.tm-panel');
    if (!panels[sectionIndex]) return;

    currentSectionRef.current = sectionIndex;
    setActiveSection(sectionIndex);

    if (prefersReducedMotion) {
      panels[sectionIndex].scrollIntoView({ behavior: 'auto' });
    } else {
      isAnimatingRef.current = true;
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[sectionIndex], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        }
      });
    }
  }, [prefersReducedMotion]);

  // Deep linking logic
  useEffect(() => {
    if (sectionId) {
      let targetId = sectionId;
      
      // Map URL patterns to section IDs
      if (sectionId === 'overview') {
        targetId = 'definition';
        if (subId === '2') targetId = 'necessity';
        if (subId === '3') targetId = 'goals';
        if (subId === '4') targetId = 'methods';
      }
      
      if (sectionId === 'advantages') {
        targetId = 'advantages';
        if (subId === '2') targetId = 'comparison';
        if (subId === '3') targetId = 'ppm-eppm';
      }

      const targetIndex = sections.findIndex((s) => s.id === targetId);

      if (targetIndex !== -1 && targetIndex !== currentSectionRef.current) {
        setTimeout(() => {
          scrollToSection(targetId);
        }, 100);
      }
    }
  }, [sectionId, subId, scrollToSection]);

  // Update URL based on section
  const updateUrlForSection = useCallback((index) => {
    let path = '/time-management';
    
    // Map section indexes to URL patterns
    if (index === 2) path = '/time-management/overview/1'; // definition
    if (index === 3) path = '/time-management/overview/2'; // necessity
    if (index === 4) path = '/time-management/overview/3'; // goals
    if (index === 5) path = '/time-management/overview/4'; // methods
    if (index === 6) path = '/time-management/advantages/1'; // advantages
    if (index === 7) path = '/time-management/advantages/2'; // comparison
    if (index === 8) path = '/time-management/advantages/3'; // ppm-eppm

    navigate(path, { replace: true });
  }, [navigate]);

  // Content animations setup
  const initContentAnimations = useCallback(() => {
    if (prefersReducedMotion) return;
    
    // Definition Section Animations
    if (definitionSectionRef.current && definitionTitleRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: definitionSectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        // 1. Title: Fade-in + slide down
        tl.fromTo(definitionTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        // 2. Definition box: Highlight sweep effect
        if (definitionBoxRef.current) {
          tl.fromTo(definitionBoxRef.current,
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out', transformOrigin: 'left center' },
            '-=0.2'
          );
        }

        // Text typing effect
        if (definitionTextRef.current) {
           tl.fromTo(definitionTextRef.current,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power1.inOut' },
            '-=0.3'
          );
        }

        // 3. Left resource icons: Pop-up one by one
        iconsRef.current.forEach((icon, index) => {
          if (icon) {
            tl.fromTo(icon,
              { opacity: 0, scale: 0, rotation: -10 },
              { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' },
              index === 0 ? '-=0.3' : '-=0.2'
            );
          }
        });

        // 4. Left arrow: Drawing animation
        if (arrowLeftRef.current) {
          tl.fromTo(arrowLeftRef.current,
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out', transformOrigin: 'left center' },
            '-=0.2'
          );
        }

        // 5. Shield: Scale up + rotation entrance
        if (shieldRef.current) {
          tl.fromTo(shieldRef.current,
            { opacity: 0, scale: 0, rotation: -180 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.4)' },
            '-=0.3'
          );
        }

        // 6. Right arrow: Drawing animation
        if (arrowRightRef.current) {
          tl.fromTo(arrowRightRef.current,
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out', transformOrigin: 'left center' },
            '-=0.3'
          );
        }

        // 7. Results: Sequential slide-in
        resultsRef.current.forEach((result, index) => {
          if (result) {
            tl.fromTo(result,
              { opacity: 0, x: 50, y: -20 },
              { opacity: 1, x: 0, y: 0, duration: 0.4, ease: 'power3.out' },
              index === 0 ? '-=0.2' : '-=0.25'
            );
          }
        });
      }, definitionSectionRef);
    }

    // Necessity Section Animations
    if (necessitySectionRef.current && necessityTitleRef.current) {
      const necessityCtx = gsap.context(() => {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: necessitySectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        // Title: Fade-in + slide down
        tl2.fromTo(necessityTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        // Cards stagger animation
        // Card 1: from left
        if (necessityCardsRef.current[0]) {
          tl2.fromTo(necessityCardsRef.current[0],
            { opacity: 0, x: -80 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
          );
        }

        // Card 2: from bottom
        if (necessityCardsRef.current[1]) {
          tl2.fromTo(necessityCardsRef.current[1],
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          );
        }

        // Card 3: from right
        if (necessityCardsRef.current[2]) {
          tl2.fromTo(necessityCardsRef.current[2],
            { opacity: 0, x: 80 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          );
        }
      }, necessitySectionRef);
    }

    // Goals section animations
    if (goalsSectionRef.current && goalsTitleRef.current) {
      const goalsCtx = gsap.context(() => {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: goalsSectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        // 0.0s - Title
        tl3.fromTo(goalsTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        // 0.3s - 3 segments fade-in simultaneously
        goalsSegmentsRef.current.forEach((segment) => {
          if (segment) {
            tl3.fromTo(segment,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
              '-=0.3'
            );
          }
        });

        // 0.6s - Pulse effect (segments move slightly towards center)
        goalsSegmentsRef.current.forEach((segment, i) => {
          if (segment) {
            const direction = i === 0 ? { x: 5, y: 5 } : i === 1 ? { x: -5, y: 5 } : { y: -8 };
            tl3.to(segment,
              { ...direction, duration: 0.2, ease: 'power2.in' },
              i === 0 ? '-=0.1' : '<'
            );
            tl3.to(segment,
              { x: 0, y: 0, duration: 0.2, ease: 'power2.out' }
            );
          }
        });

        // 0.8s - Center circle bounce entrance
        if (goalsCenterRef.current) {
          tl3.fromTo(goalsCenterRef.current,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1.1, duration: 0.4, ease: 'back.out(1.7)' },
            '-=0.3'
          );
          tl3.to(goalsCenterRef.current,
            { scale: 1, duration: 0.2, ease: 'power2.out' }
          );
        }

        // Labels fade in
        goalsLabelsRef.current.forEach((label, i) => {
          if (label) {
            tl3.fromTo(label,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
              i === 0 ? '-=0.3' : '-=0.2'
            );
          }
        });

        // 1.0s - Callout slide-in from right
        if (goalsCalloutRef.current) {
          tl3.fromTo(goalsCalloutRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.2'
          );
        }
      }, goalsSectionRef);
    }

    // Methods section animations
    if (methodsSectionRef.current && methodsTitleRef.current) {
      const methodsCtx = gsap.context(() => {
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: methodsSectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        // 0.0s - Title fade-in
        tl4.fromTo(methodsTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );

        // 0.3s - Forward arrow line drawing
        if (methodsForwardArrowRef.current) {
          const arrowLine = methodsForwardArrowRef.current.querySelector('.tm-arrow-line');
          if (arrowLine) {
            tl4.fromTo(arrowLine,
              { strokeDasharray: '300', strokeDashoffset: 300 },
              { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
              '-=0.2'
            );
          }
        }

        // 0.6s, 0.9s, 1.2s - Chevrons slide in from left
        methodsChevronsRef.current.forEach((chevron, index) => {
          if (chevron) {
            tl4.fromTo(chevron,
              { opacity: 0, x: -80 },
              { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
              index === 0 ? '-=0.3' : '-=0.35'
            );
          }
        });

        // 1.5s - Backward arrow line drawing
        if (methodsBackwardArrowRef.current) {
          const arrowLineBack = methodsBackwardArrowRef.current.querySelector('.tm-arrow-line-back');
          if (arrowLineBack) {
            tl4.fromTo(arrowLineBack,
              { strokeDasharray: '300', strokeDashoffset: -300 },
              { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
              '-=0.2'
            );
          }
        }
        
        // 1.8s - List items fade in
        const allListItems = methodsSectionRef.current.querySelectorAll('.tm-step-items li');
        if (allListItems.length > 0) {
            tl4.fromTo(allListItems,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
                '-=0.3'
            );
        }
      }, methodsSectionRef);
    }

    // Advantages section animations
    if (advantagesSectionRef.current && titleRef.current) {
      gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: advantagesSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // 0.0s - Title fade-in
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: -40 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );

        // 0.3s - Timeline base line draw (left to right)
        if (timelineLineRef.current) {
          tl.fromTo(
            timelineLineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.out",
              transformOrigin: "left center",
            },
            "-=0.2",
          );
        }

        // 0.5s, 0.7s, 0.9s - Timeline items popup sequentially
        timelineItemsRef.current.forEach((item, i) => {
          if (item) {
            const isLast = i === timelineItemsRef.current.length - 1;
            tl.fromTo(
              item,
              { opacity: 0, scale: 0, y: 20 },
              {
                opacity: 1,
                scale: isLast ? 1.1 : 1,
                y: 0,
                duration: 0.4,
                ease: "back.out(1.7)",
              },
              "-=0.2",
            );
            // Extra emphasis for "Present" item
            if (isLast) {
              tl.to(item, { scale: 1, duration: 0.2 });
            }
          }
        });

        // 1.2s - Central cloud hub scale-up
        if (hubRef.current) {
          tl.fromTo(
            hubRef.current,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
            "-=0.1",
          );
        }

        // 1.5s - Connection lines draw from center outward
        connectLinesRef.current.forEach((line, i) => {
          if (line) {
            tl.fromTo(
              line,
              { strokeDasharray: "150", strokeDashoffset: 150 },
              { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" },
              i === 0 ? "-=0.3" : "<",
            );
          }
        });

        // 1.8s - All 4 boxes fade-in with bounce simultaneously
        boxesRef.current.forEach((box, i) => {
          if (box) {
            tl.fromTo(
              box,
              { opacity: 0, scale: 0.8, y: 20 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.5)",
              },
              i === 0 ? "-=0.2" : "<",
            );
          }
        });
      }, advantagesSectionRef);
    }

    // Comparison section animations
    if (comparisonSectionRef.current && comparisonTitleRef.current) {
      gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: comparisonSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // 0.0s - Title fade-in
        tl.fromTo(
          comparisonTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );

        // 0.3s - Table Header (Left to Right)
        if (comparisonTableRef.current) {
          const headerCells =
            comparisonTableRef.current.querySelectorAll("thead th");
          tl.fromTo(
            headerCells,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.2",
          );
        }

        // 0.6s ~ 1.2s - Rows sequential buildup (Left to Right fill)
        comparisonRowsRef.current.forEach((row, i) => {
          if (row) {
            const cells = row.querySelectorAll("td");
            tl.fromTo(
              cells,
              { opacity: 0, x: -10, scale: 0.95 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.2)",
              },
              "-=0.2",
            );
          }
        });

        // 1.6s - Conclusion fade-in + highlight
        if (comparisonConclusionRef.current) {
          tl.fromTo(
            comparisonConclusionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "+=0.2",
          );
        }
      }, comparisonSectionRef);
    }

    // PPM vs EPPM section animations
    if (ppmEppmSectionRef.current && ppmEppmTitleRef.current) {
      gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ppmEppmSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // 0.0s - Title fade-in
        tl.fromTo(
          ppmEppmTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );

        // 0.3s - Center Divider Draw
        if (ppmEppmDividerRef.current) {
          tl.fromTo(
            ppmEppmDividerRef.current,
            { opacity: 0, scaleY: 0 },
            { opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.inOut" },
            "-=0.2"
          );
        }

        // 0.5s - Cards Slide-in
        ppmEppmCardsRef.current.forEach((card, i) => {
          if (card) {
            tl.fromTo(
              card,
              { opacity: 0, x: i === 0 ? -100 : 100 },
              { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
              "-=0.4",
            );
          }
        });

        // 0.8s - Icons Scale-up
        if (ppmEppmIconsRef.current.length > 0) {
            tl.fromTo(
            ppmEppmIconsRef.current,
            { opacity: 0, scale: 0, rotation: -15 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1 },
            "-=0.4"
          );
        }

        // 1.0s - Bullets Fade-in
        if (ppmEppmBulletsRef.current.length > 0) {
            tl.fromTo(
            ppmEppmBulletsRef.current,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.3"
          );
        }

        // 1.5s - Conclusion Fade-in
        if (ppmEppmConclusionRef.current) {
          tl.fromTo(
            ppmEppmConclusionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.2",
          );
        }
      }, ppmEppmSectionRef);
    }
  }, [prefersReducedMotion]);

  // GSAP scroll hijacking
  useEffect(() => {
    if (prefersReducedMotion) {
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }

    const panels = gsap.utils.toArray('.tm-panel');
    initContentAnimations();

    // Track active section and update URL
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          updateUrlForSection(i);
        },
        onEnterBack: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          updateUrlForSection(i);
        }
      });
    });

    // Wheel event handler
    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) < threshold) return;

      e.preventDefault();
      isAnimatingRef.current = true;

      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        isAnimatingRef.current = false;
        return;
      }

      currentSectionRef.current = nextSection;
      setActiveSection(nextSection);

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        }
      });
    };

    // Touch events
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimatingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY - touchEndY;
      const threshold = 50;

      if (Math.abs(delta) < threshold) return;

      isAnimatingRef.current = true;

      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        isAnimatingRef.current = false;
        return;
      }

      currentSectionRef.current = nextSection;
      setActiveSection(nextSection);

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        }
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [prefersReducedMotion, updateUrlForSection, initContentAnimations]);



  return (
    <>
      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main ref={containerRef}>
        {/* Panel 1: Hero Section */}
        <section
          className="tm-panel"
          id="hero"
          ref={heroSectionRef}
          style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="tm-hero-section">
            <div className="tm-hero-content">
              <h1 className="tm-hero-title">Time Management</h1>
              <p className="tm-hero-subtitle">공정관리</p>
            </div>
            <button
              className="scroll-indicator"
              onClick={() => scrollToSection('menu')}
              aria-label="다음 섹션으로 스크롤"
            >
              <span>Scroll Down</span>
              <div className="scroll-indicator-icon"></div>
            </button>
          </div>
        </section>

        {/* Panel 2: Menu Section */}
        <section className="tm-panel ppm-panel ppm-overview-section" id="menu" ref={menuSectionRef}>
          <div className="ppm-overview-container">
            <div className="ppm-overview-content">
              {/* Breadcrumb */}
              <nav className="ppm-breadcrumb">
                <Link to="/" className="ppm-breadcrumb-home">
                  <span className="ppm-breadcrumb-home-icon">H</span>
                </Link>
                <span className="ppm-breadcrumb-separator">&gt;</span>
                <span className="ppm-breadcrumb-item ppm-breadcrumb-current">
                  Time Management
                </span>
              </nav>

              {/* Main Title */}
              <h2 className="ppm-overview-title">
                프로젝트 일정을
                <br />
                체계적으로 관리하는 솔루션
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                Time Management는 프로젝트의 일정, 자원, 비용을 통합 관리하여
                <br />
                효율적인 공정 관리를 지원하는 솔루션입니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards */}
              <div className="ppm-submenu-grid">
                {subMenuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card"
                    onClick={() => {
                      if (item.id === 'overview') scrollToSection('definition');
                      if (item.id === 'advantages') scrollToSection('advantages');
                      if (item.id === 'cases') scrollToSection('definition'); // Placeholder
                    }}
                  >
                    <div
                      className="ppm-submenu-card-bg"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="ppm-submenu-card-overlay" />
                    <h4 className="ppm-submenu-card-title">{item.title}</h4>
                    <div className="ppm-submenu-card-arrow">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Panel 3: Definition Section */}
        <section className="tm-panel" id="definition" ref={definitionSectionRef}>
          <div className="tm-definition-section">
            <div className="tm-overview-section">
              {/* Section Title */}
              <div className="tm-section-header" ref={definitionTitleRef}>
                <h2 className="tm-section-title">공정관리의 정의</h2>
              </div>

              {/* Definition Box */}
              <div className="tm-definition-box" ref={definitionBoxRef}>
                <p className="tm-definition-text" ref={definitionTextRef}>
                  미래의 일을 계획하고, 계획된 일이 일정에 맞게 진행되도록 노력하는 것
                </p>
              </div>

              {/* Visual Flow Diagram */}
              <div className="tm-flow-container">
                {/* Input Section - Left */}
                <div className="tm-flow-input">
                  <div className="tm-input-icons">
                    <div className="tm-icon-group">
                      {/* Worker Icon */}
                      <div 
                        className="tm-icon-wrapper" 
                        ref={el => iconsRef.current[0] = el}
                        data-tooltip="인력: 숙련공, 기술자, 관리자 등"
                      >
                        <svg className="tm-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="32" cy="18" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path d="M22 16 H42 Q44 16 44 14 L42 10 Q40 8 38 8 H26 Q24 8 22 10 L20 14 Q20 16 22 16 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path d="M18 58 V40 Q18 32 26 32 H38 Q46 32 46 40 V58" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      </div>
                      {/* Scaffolding Icon */}
                      <div 
                        className="tm-icon-wrapper" 
                        ref={el => iconsRef.current[1] = el}
                        data-tooltip="자재: 철근, 콘크리트, 목재 등"
                      >
                        <svg className="tm-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="12" y="48" width="40" height="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <rect x="16" y="32" width="32" height="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <rect x="20" y="16" width="24" height="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <line x1="20" y1="52" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                          <line x1="44" y1="52" x2="44" y2="20" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      {/* Materials Icon */}
                      <div 
                        className="tm-icon-wrapper" 
                        ref={el => iconsRef.current[2] = el}
                        data-tooltip="장비: 크레인, 굴삭기, 운반차량 등"
                      >
                        <svg className="tm-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="8" y="36" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <rect x="36" y="36" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <rect x="22" y="12" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="tm-input-label">인력, 자재, 장비</p>
                </div>

                {/* Arrow with Management Label */}
                <div className="tm-flow-arrow" ref={arrowLeftRef}>
                  <span className="tm-arrow-label">경제적 운용 + 총괄적 관리</span>
                  <div className="tm-arrow-line">
                    <svg viewBox="0 0 100 24" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="var(--color-accent)"/>
                        </linearGradient>
                      </defs>
                      <path className="tm-arrow-path" d="M0 12 L85 12" stroke="url(#arrowGradient)" strokeWidth="3" fill="none"/>
                      <polygon className="tm-arrow-head" points="85,6 100,12 85,18" fill="var(--color-accent)"/>
                    </svg>
                  </div>
                </div>

                {/* Control Center - Shield Icon */}
                <div className="tm-flow-control" ref={shieldRef}>
                  <div className="tm-control-shield">
                    <svg className="tm-shield-icon" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Pulse effect circles */}
                      <circle className="tm-pulse-ring tm-pulse-ring-1" cx="40" cy="48" r="45" stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0"/>
                      <circle className="tm-pulse-ring tm-pulse-ring-2" cx="40" cy="48" r="55" stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0"/>
                      {/* Shield outline */}
                      <path className="tm-shield-outline" d="M40 4 L72 16 L72 48 Q72 72 40 92 Q8 72 8 48 L8 16 Z" stroke="var(--color-accent)" strokeWidth="2" fill="rgba(0, 212, 255, 0.1)"/>
                      {/* Clock inside shield */}
                      <circle cx="40" cy="40" r="18" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
                      <line className="tm-clock-minute" x1="40" y1="40" x2="40" y2="28" stroke="var(--color-accent)" strokeWidth="2"/>
                      <line className="tm-clock-hour" x1="40" y1="40" x2="50" y2="40" stroke="var(--color-accent)" strokeWidth="2"/>
                      {/* Gear teeth around clock */}
                      <circle className="tm-gear-ring" cx="40" cy="40" r="24" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
                    </svg>
                  </div>
                </div>

                {/* Arrow to Results */}
                <div className="tm-flow-arrow tm-flow-arrow-right" ref={arrowRightRef}>
                  <div className="tm-arrow-line">
                    <svg viewBox="0 0 100 24" preserveAspectRatio="none">
                      <path className="tm-arrow-path" d="M0 12 L85 12" stroke="url(#arrowGradient)" strokeWidth="3" fill="none"/>
                      <polygon className="tm-arrow-head" points="85,6 100,12 85,18" fill="var(--color-accent)"/>
                    </svg>
                  </div>
                </div>

                {/* Results Section - Right */}
                <div className="tm-flow-results">
                  <div 
                    className="tm-result-item tm-result-orange" 
                    ref={el => resultsRef.current[0] = el}
                    data-tooltip="프로젝트 완료 기한 준수"
                  >
                    <span className="tm-result-icon">📅</span>
                    <span className="tm-result-text">약속한 기일 내 완성</span>
                  </div>
                  <div 
                    className="tm-result-item tm-result-blue" 
                    ref={el => resultsRef.current[1] = el}
                    data-tooltip="예산 초과 없는 프로젝트 수행"
                  >
                    <span className="tm-result-icon">💰</span>
                    <span className="tm-result-text">비용 범위 내 완성</span>
                  </div>
                  <div 
                    className="tm-result-item tm-result-yellow" 
                    ref={el => resultsRef.current[2] = el}
                    data-tooltip="요구 품질 기준 달성"
                  >
                    <span className="tm-result-icon">✅</span>
                    <span className="tm-result-text">품질 충족</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 4: Necessity Section - Placeholder */}
        <section className="tm-panel" id="necessity" ref={necessitySectionRef}>
          <div className="tm-necessity-section">
            <div className="tm-necessity-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={necessityTitleRef}>
                <h2 className="tm-section-title">공정관리의 필요성</h2>
              </div>

              {/* Cards Grid */}
              <div className="tm-necessity-cards">
                {/* Card 1 */}
                <div 
                  className="tm-necessity-card tm-card-handshake"
                  ref={el => necessityCardsRef.current[0] = el}
                  onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                >
                  <div className="tm-necessity-icon tm-icon-handshake">
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="tm-hand-left" d="M15 45 L25 35 L35 40 L45 30" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      <path className="tm-hand-right" d="M45 30 L55 40 L65 35" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 50 L20 40 L30 45 L40 35 L50 45 L60 40 L70 50" stroke="var(--color-accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="20" cy="55" r="8" stroke="var(--color-accent)" strokeWidth="2" fill="rgba(0, 212, 255, 0.1)"/>
                      <circle cx="60" cy="55" r="8" stroke="var(--color-accent)" strokeWidth="2" fill="rgba(0, 212, 255, 0.1)"/>
                      <path d="M28 55 L52 55" stroke="var(--color-accent)" strokeWidth="2"/>
                      <circle className="tm-particle tm-particle-1" cx="40" cy="30" r="2" fill="var(--color-accent)"/>
                      <circle className="tm-particle tm-particle-2" cx="35" cy="25" r="1.5" fill="var(--color-accent)"/>
                      <circle className="tm-particle tm-particle-3" cx="45" cy="25" r="1.5" fill="var(--color-accent)"/>
                      <circle className="tm-particle tm-particle-4" cx="30" cy="30" r="1" fill="var(--color-accent)"/>
                      <circle className="tm-particle tm-particle-5" cx="50" cy="30" r="1" fill="var(--color-accent)"/>
                    </svg>
                  </div>
                  <h3 className="tm-necessity-card-title">발주처와의 시간 약속</h3>
                  <p className="tm-necessity-card-desc">
                    일정은 목적물 인도의 약속이며 신뢰의 척도입니다.
                  </p>
                </div>

                {/* Card 2 */}
                <div 
                  className="tm-necessity-card tm-card-document"
                  ref={el => necessityCardsRef.current[1] = el}
                  onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                >
                  <div className="tm-necessity-icon tm-icon-document">
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="15" y="10" width="40" height="55" rx="3" stroke="var(--color-accent)" strokeWidth="2" fill="rgba(0, 212, 255, 0.1)"/>
                      <line x1="22" y1="22" x2="48" y2="22" stroke="var(--color-accent)" strokeWidth="2"/>
                      <line x1="22" y1="32" x2="48" y2="32" stroke="var(--color-accent)" strokeWidth="2"/>
                      <line x1="22" y1="42" x2="40" y2="42" stroke="var(--color-accent)" strokeWidth="2"/>
                      <g className="tm-stamp">
                        <rect x="35" y="45" width="35" height="20" rx="3" stroke="#f97316" strokeWidth="2" fill="rgba(249, 115, 22, 0.2)" transform="rotate(-15 52 55)"/>
                        <text x="42" y="58" fill="#f97316" fontSize="10" fontWeight="bold" transform="rotate(-15 52 55)">PAID</text>
                      </g>
                    </svg>
                  </div>
                  <h3 className="tm-necessity-card-title">기성청구의 기본</h3>
                  <p className="tm-necessity-card-desc">
                    진행률(Progress)은 공사비 청구의 근거 데이터가 됩니다.
                  </p>
                </div>

                {/* Card 3 */}
                <div 
                  className="tm-necessity-card tm-card-shield"
                  ref={el => necessityCardsRef.current[2] = el}
                  onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                >
                  <div className="tm-necessity-icon tm-icon-shield">
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="tm-shield-body" d="M40 8 L65 18 L65 42 Q65 62 40 75 Q15 62 15 42 L15 18 Z" stroke="var(--color-accent)" strokeWidth="2" fill="rgba(0, 212, 255, 0.1)"/>
                      <circle cx="40" cy="40" r="12" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
                      <circle cx="40" cy="40" r="6" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
                      <circle cx="40" cy="40" r="2" fill="var(--color-accent)"/>
                      <g className="tm-incoming-arrow tm-arrow-1">
                        <path d="M55 25 L68 12" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                        <polygon points="68,12 62,14 66,18" fill="#f97316"/>
                      </g>
                      <g className="tm-incoming-arrow tm-arrow-2">
                        <path d="M55 55 L68 68" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                        <polygon points="68,68 62,66 66,62" fill="#f97316"/>
                      </g>
                      <g className="tm-incoming-arrow tm-arrow-3">
                        <path d="M25 55 L12 68" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                        <polygon points="12,68 18,66 14,62" fill="#f97316"/>
                      </g>
                      <circle className="tm-spark tm-spark-1" cx="55" cy="28" r="2" fill="#f97316"/>
                      <circle className="tm-spark tm-spark-2" cx="55" cy="52" r="2" fill="#f97316"/>
                      <circle className="tm-spark tm-spark-3" cx="25" cy="52" r="2" fill="#f97316"/>
                    </svg>
                  </div>
                  <h3 className="tm-necessity-card-title">변수 및 위험 관리</h3>
                  <p className="tm-necessity-card-desc">
                    불확실한 환경에서 지연을 방지하고 만회 대책을 수립합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 5: Goals Section - Placeholder */}
        <section className="tm-panel" id="goals" ref={goalsSectionRef}>
          <div className="tm-goals-section">
            <div className="tm-goals-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={goalsTitleRef}>
                <h2 className="tm-section-title">공정관리 목표</h2>
              </div>

              {/* Main Content: Diagram + Callout */}
              <div className="tm-goals-content">
                {/* Circular Diagram */}
                <div className="tm-goals-diagram">
                  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer Ring Segments - Wider radius */}
                    {/* Left Sector - 품질 조건 충족 */}
                    <path 
                      className="tm-goal-segment tm-segment-quality"
                      ref={el => goalsSegmentsRef.current[0] = el}
                      d="M250 30 A220 220 0 0 0 50 340 L250 250 Z" 
                      fill="rgba(30, 58, 138, 0.8)" 
                      stroke="rgba(59, 130, 246, 0.5)" 
                      strokeWidth="2"
                    />
                    {/* Right Sector - 총괄적 관리 */}
                    <path 
                      className="tm-goal-segment tm-segment-management"
                      ref={el => goalsSegmentsRef.current[1] = el}
                      d="M250 30 A220 220 0 0 1 450 340 L250 250 Z" 
                      fill="rgba(71, 85, 105, 0.8)" 
                      stroke="rgba(148, 163, 184, 0.5)" 
                      strokeWidth="2"
                    />
                    {/* Bottom Sector - 경제적인 자원 운용 */}
                    <path 
                      className="tm-goal-segment tm-segment-economic"
                      ref={el => goalsSegmentsRef.current[2] = el}
                      d="M50 340 A220 220 0 0 0 450 340 L250 250 Z" 
                      fill="rgba(14, 116, 144, 0.8)" 
                      stroke="rgba(6, 182, 212, 0.5)" 
                      strokeWidth="2"
                    />

                    {/* Center Circle - 계약 공기 준수 */}
                    <g ref={goalsCenterRef} className="tm-goal-center-group">
                      <circle 
                        className="tm-goal-center" 
                        cx="250" cy="250" r="80" 
                        fill="rgba(251, 146, 60, 0.9)" 
                        stroke="#f97316" 
                        strokeWidth="3"
                      />
                      <text className="tm-center-text" x="250" y="242" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">계약 공기</text>
                      <text className="tm-center-text" x="250" y="268" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">준수</text>
                    </g>

                    {/* Left Sector Icon & Text - Positioned further out */}
                    <g className="tm-goal-label tm-label-quality" ref={el => goalsLabelsRef.current[0] = el}>
                      {/* Handshake + Check Icon */}
                      <circle className="tm-label-bg" cx="110" cy="150" r="28" fill="rgba(59, 130, 246, 0.3)" stroke="var(--color-accent)" strokeWidth="1.5"/>
                      <path className="tm-handshake-path" d="M98 150 L104 144 L110 148 L122 138" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <g className="tm-check-popup">
                        <path d="M117 152 L121 157 L130 146" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <text x="110" y="200" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">품질 조건 충족</text>
                    </g>

                    {/* Right Sector Icon & Text - Positioned further out */}
                    <g className="tm-goal-label tm-label-management" ref={el => goalsLabelsRef.current[1] = el}>
                      {/* Gear Icon */}
                      <circle className="tm-label-bg" cx="390" cy="150" r="28" fill="rgba(148, 163, 184, 0.3)" stroke="var(--color-accent)" strokeWidth="1.5"/>
                      <g className="tm-gear-group">
                        <circle cx="390" cy="150" r="14" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="390" cy="150" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
                        {/* Gear teeth */}
                        <line x1="390" y1="133" x2="390" y2="138" stroke="white" strokeWidth="2"/>
                        <line x1="390" y1="162" x2="390" y2="167" stroke="white" strokeWidth="2"/>
                        <line x1="373" y1="150" x2="378" y2="150" stroke="white" strokeWidth="2"/>
                        <line x1="402" y1="150" x2="407" y2="150" stroke="white" strokeWidth="2"/>
                        <line x1="378" y1="138" x2="382" y2="142" stroke="white" strokeWidth="2"/>
                        <line x1="398" y1="158" x2="402" y2="162" stroke="white" strokeWidth="2"/>
                        <line x1="378" y1="162" x2="382" y2="158" stroke="white" strokeWidth="2"/>
                        <line x1="398" y1="142" x2="402" y2="138" stroke="white" strokeWidth="2"/>
                      </g>
                      <text x="390" y="200" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">총괄적 관리</text>
                    </g>

                    {/* Bottom Sector Icon & Text - Positioned further out */}
                    <g className="tm-goal-label tm-label-economic" ref={el => goalsLabelsRef.current[2] = el}>
                      {/* Circular arrows + Dollar */}
                      <circle className="tm-label-bg" cx="250" cy="400" r="28" fill="rgba(6, 182, 212, 0.3)" stroke="var(--color-accent)" strokeWidth="1.5"/>
                      <g className="tm-arrow-rotate-group">
                        <path d="M238 395 A14 14 0 1 1 238 405" stroke="white" strokeWidth="2" fill="none"/>
                        <polygon points="236,392 240,398 233,398" fill="white"/>
                        <path d="M262 405 A14 14 0 1 1 262 395" stroke="white" strokeWidth="2" fill="none"/>
                        <polygon points="264,408 260,402 267,402" fill="white"/>
                      </g>
                      <text className="tm-dollar-sign" x="250" y="404" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">$</text>
                      <g className="tm-sparkle-group">
                        <circle className="tm-sparkle tm-sparkle-1" cx="238" cy="388" r="2" fill="#fbbf24"/>
                        <circle className="tm-sparkle tm-sparkle-2" cx="262" cy="388" r="1.5" fill="#fbbf24"/>
                        <circle className="tm-sparkle tm-sparkle-3" cx="250" cy="382" r="1.5" fill="#fbbf24"/>
                      </g>
                      <text x="250" y="450" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">경제적인 자원 운용</text>
                    </g>

                    {/* Connecting lines - hidden by default, shown on hover */}
                    <line className="tm-connect-line tm-connect-quality" x1="135" y1="175" x2="175" y2="210" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" strokeDasharray="4 2"/>
                    <line className="tm-connect-line tm-connect-management" x1="365" y1="175" x2="325" y2="210" stroke="rgba(148, 163, 184, 0.8)" strokeWidth="2" strokeDasharray="4 2"/>
                    <line className="tm-connect-line tm-connect-economic" x1="250" y1="370" x2="250" y2="330" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="2" strokeDasharray="4 2"/>
                  </svg>
                </div>

                {/* Callout Box */}
                <div className="tm-goals-callout" ref={goalsCalloutRef}>
                  <div className="tm-callout-content">
                    <p className="tm-callout-text">
                      단순한 일정 준수를 넘어,<br/>
                      <strong>비용과 품질을 동시에 만족</strong>시켜야 함
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 6: Methods Section - Placeholder */}
        <section className="tm-panel" id="methods" ref={methodsSectionRef}>
          <div className="tm-methods-section">
            <div className="tm-methods-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={methodsTitleRef}>
                <h2 className="tm-section-title">공정관리 방법</h2>
              </div>

              {/* Top Forward Arrow */}
              <div className="tm-flow-arrow tm-arrow-forward" ref={methodsForwardArrowRef}>
                <svg viewBox="0 0 400 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="arrowhead-right" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)"/>
                    </marker>
                  </defs>
                  <line className="tm-arrow-line" x1="50" y1="15" x2="350" y2="15" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#arrowhead-right)"/>
                  {/* Moving particles */}
                  <circle className="tm-particle tm-particle-forward-1" cx="80" cy="15" r="4" fill="var(--color-accent)"/>
                  <circle className="tm-particle tm-particle-forward-2" cx="150" cy="15" r="3" fill="var(--color-accent)"/>
                  <circle className="tm-particle tm-particle-forward-3" cx="220" cy="15" r="4" fill="var(--color-accent)"/>
                  <circle className="tm-particle tm-particle-forward-4" cx="290" cy="15" r="3" fill="var(--color-accent)"/>
                </svg>
              </div>

              {/* Chevron Steps Container */}
              <div className="tm-chevron-flow">
                {/* Step 1: Planning */}
                <div className="tm-chevron-step tm-step-planning" ref={el => methodsChevronsRef.current[0] = el}>
                  <div className="tm-chevron-shape">
                    <div className="tm-chevron-header">
                      <span className="tm-step-label-en">Planning</span>
                      <span className="tm-step-label-kr">기본계획</span>
                    </div>
                    <ul className="tm-step-items">
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>WBS 분류</span>
                      </li>
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Activity & Logic 계획</span>
                      </li>
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                          <path d="M4 20 C4 16 8 14 12 14 C16 14 20 16 20 20" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Resource 산정</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 2: Scheduling */}
                <div className="tm-chevron-step tm-step-scheduling" ref={el => methodsChevronsRef.current[1] = el}>
                  <div className="tm-chevron-shape">
                    <div className="tm-chevron-header">
                      <span className="tm-step-label-en">Scheduling</span>
                      <span className="tm-step-label-kr">공정계획</span>
                    </div>
                    <ul className="tm-step-items">
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                          <line x1="9" y1="4" x2="9" y2="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Activity 공기 파악</span>
                      </li>
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2 L12 22" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 12 L22 12" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>자원 투입계획 구체화</span>
                      </li>
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>일정/공기 계산</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 3: Controlling */}
                <div className="tm-chevron-step tm-step-controlling" ref={el => methodsChevronsRef.current[2] = el}>
                  <div className="tm-chevron-shape">
                    <div className="tm-chevron-header">
                      <span className="tm-step-label-en">Controlling</span>
                      <span className="tm-step-label-kr">진도관리</span>
                    </div>
                    <ul className="tm-step-items">
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M4 4 L4 20 L20 20" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="7,14 11,10 15,13 20,7" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                        <span>실제 진행사항 기록</span>
                      </li>
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="6" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
                          <rect x="13" y="6" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
                          <path d="M7 10 L7 14" stroke="currentColor" strokeWidth="2"/>
                          <path d="M17 9 L17 15" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>계획 vs 실적 비교</span>
                      </li>
                      <li>
                        <svg className="tm-item-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2 L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M12 16 L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                          <path d="M4.93 4.93 L8.17 8.17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M15.83 15.83 L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>만회 대책 수립</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Feedback Arrow */}
              <div className="tm-flow-arrow tm-arrow-backward" ref={methodsBackwardArrowRef}>
                <svg viewBox="0 0 400 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="arrowhead-left" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
                      <polygon points="10 0, 0 3.5, 10 7" fill="#f97316"/>
                    </marker>
                  </defs>
                  <line className="tm-arrow-line-back" x1="350" y1="20" x2="50" y2="20" stroke="#f97316" strokeWidth="2" strokeDasharray="8 4" markerEnd="url(#arrowhead-left)"/>
                  <text x="200" y="12" textAnchor="middle" fill="#f97316" fontSize="10">피드백 / 재계획</text>
                  {/* Moving particles backward */}
                  <circle className="tm-particle tm-particle-backward-1" cx="320" cy="20" r="3" fill="#f97316"/>
                  <circle className="tm-particle tm-particle-backward-2" cx="250" cy="20" r="4" fill="#f97316"/>
                  <circle className="tm-particle tm-particle-backward-3" cx="180" cy="20" r="3" fill="#f97316"/>
                  <circle className="tm-particle tm-particle-backward-4" cx="110" cy="20" r="4" fill="#f97316"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 7: Advantages Section - Placeholder */}
        <section className="tm-panel" id="advantages" ref={advantagesSectionRef}>
          <div className="tm-advantages-section">
            <div className="tm-advantages-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={titleRef}>
                <h2 className="tm-section-title">왜 'Primavera'인가?</h2>
              </div>

              {/* Hub-Spoke Layout */}
              <div className="tm-hub-spoke-layout">
                {/* Left Boxes */}
                <div className="tm-spoke-column tm-spoke-left">
                  {/* Box 1 */}
                  <div className="tm-spoke-box" ref={(el) => (boxesRef.current[0] = el)}>
                    <div className="tm-spoke-icon">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="8" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="6" y1="16" x2="42" y2="16" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="18" y1="8" x2="18" y2="16" stroke="currentColor" strokeWidth="2"/>
                        <line x1="30" y1="8" x2="30" y2="16" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="15" cy="26" r="3" fill="currentColor" />
                        <circle cx="24" cy="26" r="3" fill="currentColor" />
                        <circle cx="33" cy="26" r="3" fill="currentColor" />
                        <circle cx="15" cy="34" r="3" fill="currentColor" />
                        <circle cx="24" cy="34" r="3" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="tm-spoke-text">일정, 자원, 비용 통합 관리</span>
                  </div>
                  {/* Box 2 */}
                  <div className="tm-spoke-box" ref={(el) => (boxesRef.current[1] = el)}>
                    <div className="tm-spoke-icon tm-icon-warning">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 6 L44 40 H4 L24 6Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
                        <line x1="24" y1="18" x2="24" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        <circle cx="24" cy="34" r="2" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="tm-spoke-text">리스크 관리 연계</span>
                  </div>
                </div>

                {/* Center Hub */}
                <div className="tm-hub-center">
                  <svg className="tm-connect-svg" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="tm-connect-line" ref={(el) => (connectLinesRef.current[0] = el)} d="M50 60 Q100 60 130 100" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
                    <path className="tm-connect-line" ref={(el) => (connectLinesRef.current[1] = el)} d="M50 190 Q100 190 130 150" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
                    <path className="tm-connect-line" ref={(el) => (connectLinesRef.current[2] = el)} d="M250 60 Q200 60 170 100" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
                    <path className="tm-connect-line" ref={(el) => (connectLinesRef.current[3] = el)} d="M250 190 Q200 190 170 150" stroke="var(--color-accent)" strokeWidth="2" fill="none"/>
                  </svg>
                  <div className="tm-hub-cloud" ref={hubRef}>
                    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M95 65 C105 65 115 55 115 42 C115 30 105 22 93 22 C92 15 85 5 70 5 C55 5 45 18 45 30 C30 30 20 40 20 52 C20 64 30 75 45 75 L95 75 C100 75 95 65 95 65" fill="rgba(59, 130, 246, 0.2)" stroke="var(--color-accent)" strokeWidth="2"/>
                    </svg>
                    <div className="tm-hub-text">
                      <span className="tm-hub-title">Primavera P6</span>
                    </div>
                  </div>
                </div>

                {/* Right Boxes */}
                <div className="tm-spoke-column tm-spoke-right">
                  {/* Box 3 */}
                  <div className="tm-spoke-box" ref={(el) => (boxesRef.current[2] = el)}>
                    <div className="tm-spoke-icon tm-icon-folder">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 14 L6 38 C6 40 8 42 10 42 L38 42 C40 42 42 40 42 38 L42 18 C42 16 40 14 38 14 L24 14 L20 8 L10 8 C8 8 6 10 6 12 L6 14Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                        <line x1="14" y1="26" x2="34" y2="26" stroke="currentColor" strokeWidth="2"/>
                        <line x1="14" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <span className="tm-spoke-text">단일/멀티 프로젝트 관리</span>
                  </div>
                  {/* Box 4 */}
                  <div className="tm-spoke-box" ref={(el) => (boxesRef.current[3] = el)}>
                    <div className="tm-spoke-icon tm-icon-evm">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 38 L8 14 L40 14 L40 38" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="12,30 18,24 26,28 36,18" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="36" cy="18" r="3" fill="#10b981" />
                        <text x="18" y="44" fontSize="8" fill="currentColor" fontWeight="bold">EVM</text>
                      </svg>
                    </div>
                    <span className="tm-spoke-text">EVM (Earned Value) 관리</span>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="tm-evolution-timeline" ref={timelineRef}>
                <div className="tm-timeline-line">
                  <div className="tm-timeline-track" ref={timelineLineRef}></div>
                  <div className="tm-timeline-arrow"></div>
                </div>
                <div className="tm-timeline-items">
                  <div className="tm-timeline-item" ref={(el) => (timelineItemsRef.current[0] = el)}>
                    <div className="tm-timeline-point"></div>
                    <div className="tm-timeline-content">
                      <span className="tm-timeline-year">1983</span>
                      <span className="tm-timeline-label">P3 (DOS)</span>
                    </div>
                  </div>
                  <div className="tm-timeline-item" ref={(el) => (timelineItemsRef.current[1] = el)}>
                    <div className="tm-timeline-point"></div>
                    <div className="tm-timeline-content">
                      <span className="tm-timeline-year">2000s</span>
                      <span className="tm-timeline-label">P6 (Client/Web)</span>
                    </div>
                  </div>
                  <div className="tm-timeline-item tm-timeline-current" ref={(el) => (timelineItemsRef.current[2] = el)}>
                    <div className="tm-timeline-point"></div>
                    <div className="tm-timeline-content">
                      <span className="tm-timeline-year">Present</span>
                      <span className="tm-timeline-label">Oracle Primavera P6<br /><small>(Global Standard)</small></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 8: Comparison Section - Placeholder */}
        <section className="tm-panel" id="comparison" ref={comparisonSectionRef}>
          <div className="tm-comparison-section">
            <div className="tm-comparison-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={comparisonTitleRef}>
                <h2 className="tm-section-title">공정관리 Tool 비교</h2>
              </div>

              {/* Comparison Table */}
              <div className="tm-comparison-table-wrapper">
                <table className="tm-comparison-table" ref={comparisonTableRef}>
                  <thead>
                    <tr>
                      <th className="tm-th-category">구분</th>
                      <th className="tm-th-p6">Primavera P6</th>
                      <th className="tm-th-msproject">MS-Project</th>
                      <th className="tm-th-excel">Excel (EasyPEM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr ref={(el) => (comparisonRowsRef.current[0] = el)}>
                      <td className="tm-td-category">주 사용 분야</td>
                      <td className="tm-td-p6">
                        <div className="tm-cell-content">
                          <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.2)"/>
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>건설 / 플랜트 표준<br /><small>(Global Standard)</small></span>
                        </div>
                      </td>
                      <td className="tm-td-msproject">
                        <div className="tm-cell-content">
                          <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M7 8H17M7 12H12M7 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span>소프트웨어 / IT 개발</span>
                        </div>
                      </td>
                      <td className="tm-td-excel">
                        <div className="tm-cell-content">
                          <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M8 9L10 12L8 15M12 9L14 12L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>단순 리스트 관리</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr ref={(el) => (comparisonRowsRef.current[1] = el)}>
                      <td className="tm-td-category">Network 체계</td>
                      <td className="tm-td-p6">
                        <div className="tm-cell-content">
                          <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
                            <path d="M9 12H15M15 12L15 6M15 12L15 18" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span>PDM / CPM</span>
                        </div>
                      </td>
                      <td className="tm-td-msproject">
                        <div className="tm-cell-content">
                          <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                            <path d="M9 12H15" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span>PDM</span>
                        </div>
                      </td>
                      <td className="tm-td-excel tm-td-none"><span>없음</span></td>
                    </tr>
                    {/* Row 3 */}
                    <tr ref={(el) => (comparisonRowsRef.current[2] = el)}>
                      <td className="tm-td-category">데이터 저장</td>
                      <td className="tm-td-p6">
                        <div className="tm-cell-content">
                          <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="2"/>
                            <path d="M4 6V18C4 19.7 7.6 21 12 21C16.4 21 20 19.7 20 18V6" stroke="currentColor" strokeWidth="2"/>
                            <path d="M4 12C4 13.7 7.6 15 12 15C16.4 15 20 13.7 20 12" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span>Oracle / MS-SQL<br />Database</span>
                        </div>
                      </td>
                      <td className="tm-td-msproject">
                        <div className="tm-cell-content">
                          <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H14L20 10V20H4V4Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M14 4V10H20" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span>File Based</span>
                        </div>
                      </td>
                      <td className="tm-td-excel">
                         <div className="tm-cell-content">
                           <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M4 4H14L20 10V20H4V4Z" stroke="currentColor" strokeWidth="2"/>
                             <path d="M14 4V10H20" stroke="currentColor" strokeWidth="2"/>
                           </svg>
                           <span>File Based</span>
                         </div>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr ref={(el) => (comparisonRowsRef.current[3] = el)}>
                      <td className="tm-td-category">EVM 기능</td>
                      <td className="tm-td-p6">
                         <div className="tm-cell-content">
                           <svg className="tm-cell-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                             <polyline points="7,15 10,10 14,13 17,7" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                             <circle cx="17" cy="7" r="2" fill="#10b981" />
                           </svg>
                           <span><strong>강력한 EVM 제공</strong></span>
                         </div>
                      </td>
                      <td className="tm-td-msproject"><span>기본 제공</span></td>
                      <td className="tm-td-excel tm-td-weak"><span>수기 계산 필요</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tm-comparison-conclusion" ref={comparisonConclusionRef}>
                <p>Primavera P6는 <em>대용량 데이터 처리</em>와 <em>다중 사용자 환경</em>에 최적화된 <em>산업 표준</em>입니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 9: PPM vs EPPM Section - Placeholder */}
        <section className="tm-panel" id="ppm-eppm" ref={ppmEppmSectionRef}>
          <div className="tm-ppm-eppm-section">
            <div className="tm-ppm-eppm-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={ppmEppmTitleRef} style={{ marginTop: "50px", marginBottom: "-10px" }}>
                <h2 className="tm-section-title">P6 PPM vs. EPPM</h2>
              </div>

               {/* Two Column Layout */}
               <div className={`tm-ppm-eppm-grid ${isResizing ? 'tm-resizing' : ''}`} style={{ gridTemplateColumns: `${leftRatio}% auto 1fr`, marginTop: "50px", marginBottom: "-10px" }}>
                 {/* PPM Card */}
                 <div className="tm-ppm-eppm-card tm-ppm-card" ref={(el) => (ppmEppmCardsRef.current[0] = el)}>
                   <div className="tm-ppm-eppm-card-header">
                     <h3>PPM</h3>
                     <span>(Professional)</span>
                   </div>
                   <div className="tm-ppm-eppm-card-content">
                     <div className="tm-ppm-eppm-icon" ref={(el) => (ppmEppmIconsRef.current[0] = el)}>
                       <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect x="0" y="8" width="18" height="48" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)"/>
                         <circle cx="9" cy="14" r="2" fill="currentColor" />
                         <rect x="4" y="20" width="10" height="8" rx="1" fill="rgba(59, 130, 246, 0.3)" />
                         <rect x="24" y="8" width="54" height="38" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(59, 130, 246, 0.1)"/>
                         <rect x="28" y="12" width="46" height="30" rx="1" fill="rgba(59, 130, 246, 0.2)"/>
                         <path d="M51 46 L51 54 L41 54 L41 56 L61 56 L61 54 L51 54 L51 46" stroke="currentColor" strokeWidth="2" fill="none"/>
                         <rect x="34" y="60" width="34" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="rgba(59, 130, 246, 0.1)"/>
                         <ellipse cx="76" cy="64" rx="4" ry="3" stroke="currentColor" strokeWidth="1.5" fill="rgba(59, 130, 246, 0.1)"/>
                       </svg>
                     </div>
                     <ul className="tm-ppm-eppm-features">
                       <li ref={(el) => (ppmEppmBulletsRef.current[0] = el)}><span className="tm-bullet"></span><span>Client-based (PC 설치형)</span></li>
                       <li ref={(el) => (ppmEppmBulletsRef.current[1] = el)}><span className="tm-bullet"></span><span>Power User 중심</span></li>
                       <li ref={(el) => (ppmEppmBulletsRef.current[2] = el)}><span className="tm-bullet"></span><span>독립적 프로젝트 관리</span></li>
                     </ul>
                   </div>
                 </div>

                 {/* Divider */}
                 <div className="tm-ppm-eppm-divider" ref={ppmEppmDividerRef} onMouseDown={handleMouseDown}>
                   <div className="tm-ppm-eppm-vs">VS</div>
                   <div className="tm-divider-tooltip">
                     <span className="tm-divider-arrow">←</span>
                     <span className="tm-divider-text">두 버전 비교하기</span>
                     <span className="tm-divider-arrow">→</span>
                   </div>
                 </div>

                 {/* EPPM Card */}
                 <div className="tm-ppm-eppm-card tm-eppm-card" ref={(el) => (ppmEppmCardsRef.current[1] = el)}>
                   <div className="tm-ppm-eppm-card-header">
                     <h3>EPPM</h3>
                     <span>(Enterprise)</span>
                   </div>
                   <div className="tm-ppm-eppm-card-content">
                     <div className="tm-ppm-eppm-icon" ref={(el) => (ppmEppmIconsRef.current[1] = el)}>
                       <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <circle cx="18" cy="38" r="16" stroke="currentColor" strokeWidth="2" fill="rgba(16, 185, 129, 0.1)"/>
                         <ellipse cx="18" cy="38" rx="7" ry="16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                         <line x1="2" y1="38" x2="34" y2="38" stroke="currentColor" strokeWidth="1.5"/>
                         <rect x="62" y="28" width="18" height="30" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(16, 185, 129, 0.1)"/>
                         <line x1="62" y1="38" x2="80" y2="38" stroke="currentColor" strokeWidth="1.5"/>
                         <line x1="62" y1="48" x2="80" y2="48" stroke="currentColor" strokeWidth="1.5"/>
                         <circle cx="66" cy="33" r="1.5" fill="#10b981" />
                         <circle cx="66" cy="43" r="1.5" fill="#10b981" />
                         <circle cx="66" cy="53" r="1.5" fill="#10b981" />
                         <path d="M48 2 C43 2 39 6 39 10 C35 10 32 13 32 17 C32 21 35 24 40 24 L58 24 C62 24 66 20 66 16 C66 12 62 8 58 8 C58 4 54 2 48 2" stroke="currentColor" strokeWidth="2" fill="rgba(16, 185, 129, 0.2)"/>
                         <path d="M49 18 L49 10 M46 13 L49 10 L52 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         <path d="M34 38 L62 38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                       </svg>
                     </div>
                     <ul className="tm-ppm-eppm-features">
                       <li ref={(el) => (ppmEppmBulletsRef.current[3] = el)}><span className="tm-bullet"></span><span>Web-based (설치 불필요)</span></li>
                       <li ref={(el) => (ppmEppmBulletsRef.current[4] = el)}><span className="tm-bullet"></span><span>모든 참여자 협업</span></li>
                       <li ref={(el) => (ppmEppmBulletsRef.current[5] = el)}><span className="tm-bullet"></span><span>전사적 포트폴리오 관리</span></li>
                     </ul>
                   </div>
                 </div>
               </div>

               {/* Conclusion */}
               <div className="tm-ppm-eppm-conclusion" ref={ppmEppmConclusionRef}>
                 <p>프로젝트 규모와 조직 환경에 맞춰 <em>최적의 버전</em>을 선택하세요.</p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TimeManagementPage;
