import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

// Component helping to scroll to page anchors, taking into account the height of top banner.
// It is loaded/called in the "Routers" component.
const ScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef('');
  // Depends on the width of the window as we move the search box beneath the banner in smaller screen
  const navbarHeight = window.innerWidth > 991 ? 80 : 150;

  useEffect(() => {
    if (location.hash.length > 0) {
        lastHash.current = location.hash.slice(1);
    }
    if (lastHash.current.length > 0 && document.getElementById(lastHash.current)) {
        setTimeout(() => {
            const element = document.getElementById(lastHash.current);
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        }, 100)
    }
  }, [location])

  return null
}

export default ScrollToAnchor