import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'
import method from 'src/modules/depositMethod/list/depositMethodListActions'
import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';

import { useDispatch, useSelector } from "react-redux";
function DepositPage() {
    const dispatch = useDispatch();
    const listMethod = useSelector(selectors.selectRows);
    const loading = useSelector(selectors.selectLoading);


    const offsiteExchanges = [
        { name: 'Gemini', icon: 'fas fa-gem', src: './images/market/gemini.jpg' },
        { name: 'Coinbase', icon: 'fas fa-coins', src: './images/market/coinbase.jpg' },
        { name: 'Kraken', icon: 'fas fa-anchor', src: './images/market/kraken.jpg' },
        { name: 'Shakepay', icon: 'fas fa-handshake', src: './images/market/shakepay.jpg' }
    ]


    useEffect(() => {
        dispatch(method.doFetch());
    }, [dispatch]);
    return (
        <div className="dpl__container">
            {/* Header Section */}
            <div className="dpl__header">
                <div className="dpl__nav-bar">
                    <Link to="/wallets" className="dpl__back-btn remove_blue">
                        <i className="fas fa-arrow-left" />
                    </Link>
                    <div className="dpl__page-title">Deposit</div>
                    <Link className="dpl__history-btn remove_blue" to="/history">
                        <i className="fas fa-receipt" />
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="dpl__content-area">
                <div className="dpl__content-wrapper">
                    {/* Section Title */}
                    <div className="dpl__section-heading">Select the currency you want to recharge</div>

                    {/* Cryptocurrency Grid */}
                    <div className="dpl__crypto-grid">
                        {listMethod?.map((crypto) => (
                            <Link
                                key={crypto.symbol}
                                to={`/deposit/wallet/${crypto.symbol}`}
                                className="dpl__crypto-card remove_blue"
                            >
                                <div className="dpl__crypto-icon-wrapper">
                                    <img
                                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${crypto.symbol}.png`}
                                        alt={crypto.symbol}
                                        className="dpl__crypto-icon-img"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const img = e.currentTarget;
                                            img.onerror = null;
                                            img.style.display = 'none';
                                            if (img.parentElement) {
                                                img.parentElement.innerHTML = crypto.symbol;
                                                img.parentElement.style.color = '#F3BA2F';
                                                img.parentElement.style.fontSize = '16px';
                                                img.parentElement.style.fontWeight = 'bold';
                                            }
                                        }}
                                    />
                                </div>
                                <div className="dpl__crypto-symbol">{crypto.symbol}</div>
                            </Link>
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="dpl__loading-state">
                            <div className="dpl__spinner" />
                            <div className="dpl__loading-text">Loading currencies...</div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && listMethod?.length === 0 && (
                        <div className="dpl__empty-state">
                            <i className="fas fa-coins dpl__empty-icon" />
                            <div className="dpl__empty-text">No currencies available</div>
                            <div className="dpl__empty-subtext">Please check back later</div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                /* ── Container ── */
                .dpl__container {
                    max-width: 400px;
                    margin: 0 auto;
                    min-height: 100vh;
                    background: #000000;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    color: #FFFFFF;
                }

                /* ── Header / Top Bar ── */
                .dpl__header {
                    display: flex;
                    align-items: center;
                    padding: 0 16px;
                    height: 56px;
                    background: #1A1A1A;
                    border-bottom: 1px solid #2a2a2e;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    backdrop-filter: blur(10px);
                }
                .dpl__nav-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }
                .dpl__back-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: #1A1A1A;
                    border: 1px solid #2a2a2e;
                    color: #FFFFFF;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }
                .dpl__back-btn:hover { 
                    background: #2a2a2e; 
                    border-color: #F3BA2F; 
                    color: #F3BA2F; 
                    transform: translateX(-2px);
                }
                .dpl__page-title {
                    color: #FFFFFF;
                    font-size: 18px;
                    font-weight: bold;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    letter-spacing: 0.3px;
                }
                .dpl__history-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: #1A1A1A;
                    border: 1px solid #2a2a2e;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    color: #FFFFFF !important;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .dpl__history-btn:hover { 
                    border-color: #F3BA2F; 
                    color: #F3BA2F !important; 
                    background: #2a2a2e;
                    transform: translateX(2px);
                }

                /* ── Content Area ── */
                .dpl__content-area {
                    background: #000000;
                    padding: 24px 16px;
                    min-height: calc(100vh - 56px);
                }
                .dpl__content-wrapper { 
                    width: 100%; 
                }

                /* ── Section Heading ── */
                .dpl__section-heading {
                    font-size: 14px;
                    font-weight: bold;
                    color: #AAAAAA;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 20px;
                    padding-left: 4px;
                }

                /* ── Crypto Grid ── */
                .dpl__crypto-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 32px;
                }
                .dpl__crypto-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 24px 12px 20px;
                    background: #1A1A1A;
                    border: 1px solid #2a2a2e;
                    border-radius: 12px;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    gap: 12px;
                    position: relative;
                    overflow: hidden;
                }
                .dpl__crypto-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at center, rgba(243, 186, 47, 0.05) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .dpl__crypto-card:hover {
                    background: #2a2a2e;
                    border-color: #F3BA2F;
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(243, 186, 47, 0.15);
                }
                .dpl__crypto-card:hover::before {
                    opacity: 1;
                }
                .dpl__crypto-icon-wrapper {
                    width: 52px;
                    height: 52px;
                    border-radius: 12px;
                    background: #000000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border: 1px solid #2a2a2e;
                    position: relative;
                    z-index: 1;
                    transition: all 0.3s ease;
                }
                .dpl__crypto-card:hover .dpl__crypto-icon-wrapper {
                    border-color: #F3BA2F;
                    box-shadow: 0 0 20px rgba(243, 186, 47, 0.2);
                }
                .dpl__crypto-icon-img { 
                    width: 100%; 
                    height: 100%; 
                    object-fit: contain;
                    transition: transform 0.3s ease;
                }
                .dpl__crypto-card:hover .dpl__crypto-icon-img {
                    transform: scale(1.1);
                }
                .dpl__crypto-symbol {
                    font-size: 13px;
                    font-weight: 700;
                    color: #FFFFFF;
                    text-align: center;
                    position: relative;
                    z-index: 1;
                    transition: color 0.3s ease;
                }
                .dpl__crypto-card:hover .dpl__crypto-symbol {
                    color: #F3BA2F;
                }

                /* ── Loading State ── */
                .dpl__loading-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: #AAAAAA;
                }
                .dpl__spinner {
                    border: 3px solid #2a2a2e;
                    border-top: 3px solid #F3BA2F;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: dplSpin 1s linear infinite;
                    margin: 0 auto 16px;
                }
                @keyframes dplSpin { 
                    0% { transform: rotate(0deg); } 
                    100% { transform: rotate(360deg); } 
                }
                .dpl__loading-text {
                    font-size: 14px;
                    color: #AAAAAA;
                }

                /* ── Empty State ── */
                .dpl__empty-state {
                    text-align: center;
                    padding: 60px 20px;
                }
                .dpl__empty-icon {
                    font-size: 48px;
                    color: #F3BA2F;
                    margin-bottom: 16px;
                    opacity: 0.5;
                }
                .dpl__empty-text {
                    font-size: 16px;
                    color: #AAAAAA;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                .dpl__empty-subtext {
                    font-size: 13px;
                    color: #666666;
                }

                /* ── Responsive Design ── */
                @media (max-width: 768px) {
                    .dpl__container {
                        max-width: 100%;
                    }
                    .dpl__content-area {
                        padding: 20px 12px;
                    }
                    .dpl__page-title {
                        font-size: 16px;
                    }
                    .dpl__crypto-card {
                        padding: 20px 10px 16px;
                    }
                    .dpl__crypto-icon-wrapper {
                        width: 44px;
                        height: 44px;
                    }
                    .dpl__crypto-symbol {
                        font-size: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .dpl__crypto-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 10px;
                    }
                    .dpl__section-heading {
                        font-size: 13px;
                        margin-bottom: 16px;
                    }
                }

                @media (max-width: 350px) {
                    .dpl__crypto-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 8px;
                    }
                }
            `}</style>
        </div>
    )
}

export default DepositPage