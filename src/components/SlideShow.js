import React, { useState, useRef } from "react";
import Button from "@atlaskit/button";
import leftArrowIcon from "../lib/left-2-svgrepo-com.svg";
import rightArrowIcon from "../lib/right-2-svgrepo-com.svg";
import { useEffect } from "react";

function Slideshow({ images }) {
    const [index, setIndex] = useState(0);
    const slideRef = useRef(null);
    let startX = 0, isDragging = false;

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
    };

    const handleMouseUp = (e) => {
        if (!isDragging) return;
        let endX = e.clientX;
        if (startX - endX > 50) nextSlide(); // Kéo trái → ảnh tiếp theo
        else if (endX - startX > 50) prevSlide(); // Kéo phải → ảnh trước đó
        isDragging = false;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 4000);
        return () => clearTimeout(timer); // Cleanup để tránh setTimeout chồng chất
    }, [index]);

    return (
        <div className="slide-show-container">

            <div
                ref={slideRef}
                style={{
                    display: "flex",
                    transition: "transform 0.5s",
                    transform: `translateX(-${index * 100}%)`,
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {images.map((img, i) => (
                    <img key={i} src={img} alt={`slide-${i}`} style={{ width: "100%", height: "100%", flexShrink: 0, objectFit: 'contain', userSelect: 'none' }} />
                ))}
            </div>
            <Button onClick={prevSlide} style={{zIndex:"10", position: "absolute", left: "10px", top: "47%", backgroundColor: "rgba(0,0,0,0)" }}><img style={{ width: "30px", height: "30px" }} src={leftArrowIcon} /></Button>
            <Button onClick={nextSlide} style={{zIndex:"10", position: "absolute", right: "10px", top: "47%", backgroundColor: "rgba(0,0,0,0)" }}><img style={{ width: "30px" }} src={rightArrowIcon} /></Button>
            <div className="dots">
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${index === i ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slideshow;
