import React, { useEffect, useState } from "react";
import Slideshow from "./SlideShow";
import ProductItem from "./ProductItem";

import uri, { getUri } from "../js/site";

import slide1 from "../lib/slideshow_1.jpg";
import slide2 from "../lib/slideshow_3.webp";
import slide3 from "../lib/slideshow_4.webp";
import axios from "axios";
import { FlaskConical, FlaskConicalOff, HandCoins, HeartHandshake, WineOff } from "lucide-react";
const slides = [
    slide1, slide2, slide3
];
function Home() {
    const [newProducts, setNewProducts] = useState([]);
    const [bestSaleProducts, setBestSaleProducts] = useState([]);
    useEffect(() => {
        axios.post(getUri() + "/products-get-by-params", {
            row: 10,
            page: 1,
            keyword: "",
            sort: "newest",
            get_type: "user",
            category_slug: ""
        }, { withCredentials: true })
            .then((res) => {
                if (!res.data) return <></>;
                const productsDatas = res.data;

                setNewProducts(productsDatas.map((p, index) => {
                    const imgNames = JSON.parse(p.product_imgs);
                    const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                    return (<ProductItem
                        key={p.product_id}
                        id={p.product_id}
                        displayName={p.display_name}
                        categoryName={p.category_name}
                        price={p.price}
                        categorySlug={p.category_slug}
                        img={getUri() + `/product/get-imgs/product_imgs/` + imageName}
                    />)
                }))
            }).catch(err => {

            })

        //
        axios.post(getUri() + "/products-get-by-params", {
            row: 10,
            page: 1,
            keyword: "",
            sort: "bestsale",
            get_type: "user",
            category_slug: ""
        }, { withCredentials: true })
            .then((res) => {
                if (!res.data) return <></>;
                setBestSaleProducts(res.data)
            }).catch(err => {

            })
    }, [])
    return (
        <>
            <div className="slide-show">
                <Slideshow images={slides} />
            </div>
            
            <div className="product-container newproduct-container">
                <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "30px" }}>
                    <div className="product-container-title">
                        <p>SẢN PHẨM MỚI</p>
                    </div>
                </div>
                <div className="products">
                    {newProducts}
                </div>
            </div>
            <div className="mini-slide">
                <div>
                    <HeartHandshake color="white" size={100} strokeWidth={1}/><span>An toàn thực phẩm</span>
                </div>
                <div>
                    <FlaskConicalOff color="white" size={100} strokeWidth={1}/><span>Không tồn dư hóa chất</span>
                </div>
                <div>
                    <HandCoins color="white" size={100} strokeWidth={1}/><span>Giá cả hợp lý</span>
                </div>
            </div>
            <div className="product-container bestproduct-container">
                <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "30px" }}>
                    <div className="product-container-title">
                        <p>SẢN PHẨM NỔI BẬT</p>
                    </div>
                    
                </div>
                <div className="products">
                    {bestSaleProducts.map((p, index) => {
                        const imgNames = JSON.parse(p.product_imgs);
                        const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                        return (<ProductItem
                            key={p.product_id}
                            id={p.product_id}
                            displayName={p.display_name}
                            categoryName={p.category_name}
                            price={p.price}
                            categorySlug={p.category_slug}
                            img={getUri() + `/product/get-imgs/product_imgs/` + imageName}
                        />)
                    })}
                </div>
            </div>
        </>
    )
}
export default Home;