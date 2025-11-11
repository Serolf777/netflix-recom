import { useEffect, useState } from 'react';

export function isMobile(mobile_breakpoint = 768) {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${mobile_breakpoint - 1}px)`);

        const onChange = () => {
            setIsMobile(window.innerWidth < mobile_breakpoint);
        };

        mql.addEventListener("change", onChange);

        setIsMobile(window.innerWidth < mobile_breakpoint);

        return () => {
            mql.removeEventListener("change", onChange);
        }

    }, [mobile_breakpoint]);

    return !!isMobile;
}