import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomePage.scss';

/**
 * HomePage
 * Simple landing view with GSAP entrance animations
 */
const HomePage = () => {
	const rootRef = useRef(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Scope GSAP selectors and ScrollTriggers to this component
		const ctx = gsap.context(() => {
			// Hero animation
			gsap.set('.home-hero-line', { opacity: 0, y: 18 });

			gsap.to('.home-hero-line', {
				opacity: 1,
				y: 0,
				duration: 0.7,
				stagger: 0.1,
				ease: 'power2.out'
			});

			gsap.from('.home-cta', {
				opacity: 0,
				scale: 0.96,
				duration: 0.6,
				delay: 0.25,
				ease: 'power2.out'
			});

			// Section reveals
			gsap.utils.toArray('.reveal').forEach((el) => {
				gsap.from(el, {
					opacity: 0,
					y: 28,
					duration: 0.6,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: el,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}, rootRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={rootRef} className="home-page">
			{/* Top navigation */}
			<header className="home-nav">
				<div className="home-nav__brand">
					<span className="home-nav__logo">A</span>
					<a href="/" className="home-nav__title">Appetizer</a>
				</div>
				<nav className="home-nav__links">
					<a href="#features">Features</a>
					<a href="#showcase">Showcase</a>
					<a href="#pricing">Pricing</a>
					<a href="/editor" className="home-nav__cta">Open Editor</a>
				</nav>
			</header>

			{/* Hero section */}
			<section className="hero">
				<h1 className="hero__title">
					<span className="home-hero-line">Build Faster.</span>
					<span className="home-hero-line">Launch Confidently.</span>
				</h1>
				<p className="hero__subtitle home-hero-line">
					Design, iterate, and ship UI with a canvas-first editor.
				</p>
				<div className="hero__actions">
					<a className="home-cta" href="/editor">Open Editor</a>
				</div>

				<div className="hero__mock reveal">
					<div className="device-mock">
						<div className="device-bar" />
						<div className="device-screen">
							<div className="screen-grid">
								<div />
								<div />
								<div />
								<div />
								<div />
								<div />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section id="features" className="features reveal">
				<div className="features__grid">
					<article className="feature">
						<h3>Canvas-first editing</h3>
						<p>Compose layouts and components directly on the canvas.</p>
					</article>
					<article className="feature">
						<h3>Device presets</h3>
						<p>Preview across sizes and frames with one click.</p>
					</article>
					<article className="feature">
						<h3>Export anywhere</h3>
						<p>Generate shareable output and integrate with your stack.</p>
					</article>
				</div>
			</section>

			{/* Showcase */}
			<section id="showcase" className="showcase reveal">
				<div className="showcase__card" />
				<div className="showcase__card" />
				<div className="showcase__card" />
			</section>

			{/* CTA */}
			<section id="pricing" className="cta reveal">
				<h2>Ready to start?</h2>
				<p>Open the editor and try building a component now.</p>
				<a className="home-cta" href="/editor">Open Editor</a>
			</section>

			{/* Footer */}
			<footer className="footer">
				<div className="footer__grid">
					<div>
						<div className="footer__brand">Appetizer</div>
						<p className="footer__text">Canvas-first UI editor.</p>
					</div>
					<div>
						<div className="footer__heading">Product</div>
						<a href="#features">Features</a>
						<a href="#showcase">Showcase</a>
					</div>
					<div>
						<div className="footer__heading">Company</div>
						<a href="#">About</a>
						<a href="#">Contact</a>
					</div>
					<div>
						<div className="footer__heading">Get Started</div>
						<a href="/editor">Open Editor</a>
					</div>
				</div>
				<div className="footer__bottom">© {new Date().getFullYear()} Appetizer</div>
			</footer>
		</div>
	);
};

export default HomePage;

