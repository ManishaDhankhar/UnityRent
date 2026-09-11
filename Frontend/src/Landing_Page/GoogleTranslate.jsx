import React, { useEffect, useRef } from "react";
import { IconButton, Tooltip, Box } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

const GoogleTranslate = () => {
    const isInitialized = useRef(false);

    useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true;

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'hi,pa,en,te,bn,mr,ta,gu',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
            }, 'google_translate_element');
        };

        const addScript = document.createElement('script');
        addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        addScript.async = true;
        document.body.appendChild(addScript);

        // This observer kills the "top bar" the moment Google tries to inject it
        const observer = new MutationObserver(() => {
            const googleBar = document.querySelector('.goog-te-banner-frame');
            if (googleBar) googleBar.style.display = 'none';
            if (document.body.style.top !== '0px') document.body.style.top = '0px';
        });

        observer.observe(document.body, { attributes: true, childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return (
        <Box sx={{
        position: 'relative', 
        display: 'inline-flex', // Changed to inline-flex for better alignment
        alignItems: 'center',
        justifyContent: 'center' }}>
            {/* THE TRICK: 
               We put the Google element INSIDE the Box but make it 
               fully transparent and cover the entire icon area.
            */}
            <div 
                id="google_translate_element" 
                style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                opacity: 0, 
                zIndex: 10, 
                cursor: 'pointer',
                overflow: 'hidden',
                }} 
            />
            
            <Tooltip title="Translate Page">
                <IconButton sx={{ color: '#063b28', pointerEvents: 'none' }}>
                    <TranslateIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default GoogleTranslate;