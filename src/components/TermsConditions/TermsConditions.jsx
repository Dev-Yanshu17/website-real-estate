import React, { useState, useEffect, useRef } from 'react';
import './TermsConditions.css';

const TermsAndConditions = () => {
    const [agreed, setAgreed] = useState(false);
    const [activeSection, setActiveSection] = useState('introduction');
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    const sectionsRef = useRef({});
    const containerRef = useRef(null);

    const termsData = [
        {
            id: 'introduction',
            title: '1. Introduction',
            content: `
                Welcome to PropertyPro, a comprehensive real estate property management system. 
                These Terms and Conditions govern your use of our platform, services, and applications. 
                By accessing or using PropertyPro, you agree to be bound by these Terms.
                
                PropertyPro provides a digital platform for property owners, managers, tenants, 
                and real estate professionals to manage properties, leases, payments, maintenance requests, 
                and other property-related activities.
            `,
            important: "These Terms constitute a legally binding agreement between you and PropertyPro Management Inc. Please read them carefully before using our services."
        },
        {
            id: 'definitions',
            title: '2. Definitions',
            content: `
                In these Terms, the following definitions apply:
            `,
            list: [
                '"Platform" refers to the PropertyPro website, mobile applications, and related services.',
                '"User" means any individual or entity who accesses or uses the Platform.',
                '"Property Owner" refers to users who list and manage properties on the Platform.',
                '"Tenant" refers to users who rent or lease properties through the Platform.',
                '"Property Manager" refers to users who manage properties on behalf of owners.',
                '"Content" includes all information, data, text, images, and other materials on the Platform.',
                '"Services" means all features, functions, and services provided through the Platform.'
            ]
        },
        {
            id: 'user-accounts',
            title: '3. User Accounts and Registration',
            content: `
                To access certain features of PropertyPro, you must register for an account. You agree to:
            `,
            numberedList: [
                'Provide accurate, current, and complete information during registration',
                'Maintain and promptly update your account information',
                'Maintain the security of your password and accept all risks of unauthorized access',
                'Notify us immediately of any unauthorized use of your account',
                'Be responsible for all activities that occur under your account'
            ],
            additional: 'PropertyPro reserves the right to suspend or terminate accounts that provide false information or violate these Terms.'
        },
        {
            id: 'property-listings',
            title: '4. Property Listings and Management',
            content: 'Property Owners and Managers may list properties on the Platform subject to the following conditions:',
            subsections: [
                {
                    title: '4.1 Listing Accuracy',
                    content: 'All property information, including descriptions, photos, pricing, and availability, must be accurate and not misleading.'
                },
                {
                    title: '4.2 Legal Compliance',
                    content: 'Listings must comply with all applicable laws, including fair housing and anti-discrimination laws.'
                },
                {
                    title: '4.3 Tenant Screening',
                    content: 'PropertyPro may provide tenant screening services, but ultimate responsibility for tenant selection remains with the Property Owner/Manager.'
                }
            ]
        },
        {
            id: 'payments',
            title: '5. Payments and Fees',
            content: 'PropertyPro may charge fees for certain services. By using these services, you agree to pay all applicable fees.',
            subsections: [
                {
                    title: '5.1 Subscription Fees',
                    content: 'Property management features may require a subscription fee. Fees are billed in advance and are non-refundable.'
                },
                {
                    title: '5.2 Transaction Fees',
                    content: 'A transaction fee may apply to rent payments, application fees, or other financial transactions processed through the Platform.'
                },
                {
                    title: '5.3 Payment Processing',
                    content: 'All payments are processed through secure third-party payment processors. PropertyPro does not store credit card information.'
                }
            ]
        },
        {
            id: 'liability',
            title: '6. Liability and Disclaimers',
            disclaimer: 'PropertyPro is a platform that facilitates property management activities. We do not own, sell, or lease properties listed on our platform.',
            content: `
                PropertyPro provides the Platform "as is" and "as available" without warranties of any kind. 
                We do not guarantee that:
            `,
            list: [
                'The Platform will be uninterrupted, secure, or error-free',
                'Listings are accurate or properties are as described',
                'Tenants or Property Owners will fulfill their obligations'
            ],
            additional: 'To the maximum extent permitted by law, PropertyPro shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform.'
        },
        {
            id: 'termination',
            title: '7. Termination',
            content: 'Either party may terminate these Terms at any time by providing notice to the other party. Upon termination:',
            numberedList: [
                'Your right to use the Platform immediately ceases',
                'You must pay any outstanding fees',
                'PropertyPro may retain your data as required by law or for legitimate business purposes'
            ],
            additional: 'PropertyPro may suspend or terminate your access to the Platform immediately if you violate these Terms.'
        },
        {
            id: 'changes',
            title: '8. Changes to Terms',
            content: `
                PropertyPro reserves the right to modify these Terms at any time. 
                We will provide notice of significant changes through the Platform or via email.
                
                Your continued use of the Platform after changes become effective constitutes acceptance of the revised Terms. 
                If you disagree with the changes, you must stop using the Platform.
            `
        }
    ];

    const navItems = [
        { id: 'introduction', label: 'Introduction' },
        { id: 'definitions', label: 'Definitions' },
        { id: 'user-accounts', label: 'User Accounts' },
        { id: 'property-listings', label: 'Property Listings' },
        { id: 'payments', label: 'Payments' },
        { id: 'liability', label: 'Liability' },
        { id: 'termination', label: 'Termination' },
        { id: 'changes', label: 'Changes to Terms' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Show/hide scroll to top button
            setShowScrollTop(window.pageYOffset > 300);

            // Update active section based on scroll position
            const scrollPosition = window.pageYOffset + 150;
            
            for (const [id, element] of Object.entries(sectionsRef.current)) {
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = sectionsRef.current[sectionId];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleAccept = () => {
        if (agreed) {
            alert('Thank you for accepting our Terms and Conditions. You will now be redirected to your dashboard.');
            // In a real app, you would redirect or update user state here
            // history.push('/dashboard');
        }
    };

    const handleDecline = () => {
        const confirmDecline = window.confirm(
            'Declining our Terms and Conditions will limit your access to PropertyPro features. ' +
            'Are you sure you want to decline?'
        );
        
        if (confirmDecline) {
            alert('You have declined the Terms and Conditions. Your access to certain features may be limited.');
            setAgreed(false);
        }
    };

    return (
        <div className="terms-page" ref={containerRef}>
            
            {/* Main Content */}
            <main className="main-content">
                <div className="container">
                    <div className="page-title">
                        <h1>Terms & Conditions</h1>
                        <p>PropertyPro Real Estate Management System</p>
                    </div>

                    <div className="terms-container">
                        {/* Terms Navigation */}
                        <div className="terms-nav">
                            <h3>Quick Navigation</h3>
                            <div className="terms-nav-links">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        className={`terms-nav-link ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Terms Content */}
                        <div className="terms-content">
                            {termsData.map((section) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="terms-section"
                                    ref={(el) => (sectionsRef.current[section.id] = el)}
                                >
                                    <h2>{section.title}</h2>
                                    <p>{section.content}</p>
                                    
                                    {section.important && (
                                        <div className="highlight">
                                            <p><strong>Important:</strong> {section.important}</p>
                                        </div>
                                    )}
                                    
                                    {section.disclaimer && (
                                        <div className="highlight">
                                            <p><strong>Disclaimer:</strong> {section.disclaimer}</p>
                                        </div>
                                    )}
                                    
                                    {section.list && (
                                        <ul>
                                            {section.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    
                                    {section.numberedList && (
                                        <ol>
                                            {section.numberedList.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ol>
                                    )}
                                    
                                    {section.subsections && section.subsections.map((subsection, index) => (
                                        <div key={index}>
                                            <h3>{subsection.title}</h3>
                                            <p>{subsection.content}</p>
                                        </div>
                                    ))}
                                    
                                    {section.additional && <p>{section.additional}</p>}
                                </section>
                            ))}

                            {/* Last Updated */}
                            {/* <div className="last-updated">
                                <p>Last updated: {new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</p>
                            </div> */}

                            {/* Agreement Section
                            <div className="agreement-box">
                                <h2>Agreement</h2>
                                <p>By checking the box below, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
                                
                                <div className="checkbox-container">
                                    <input 
                                        type="checkbox" 
                                        id="agree-checkbox" 
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <label htmlFor="agree-checkbox">
                                        I have read and agree to the PropertyPro Terms and Conditions
                                    </label>
                                </div>
                                
                                <p>By accepting these Terms, you also acknowledge that you have read our <a href="/privacy">Privacy Policy</a> and consent to the collection and use of your information as described therein.</p>
                                
                                <div className="btn-container">
                                    <button 
                                        id="accept-btn" 
                                        className="btn btn-primary" 
                                        disabled={!agreed}
                                        onClick={handleAccept}
                                    >
                                        Accept Terms & Continue
                                    </button>
                                    <button 
                                        id="decline-btn" 
                                        className="btn btn-secondary"
                                        onClick={handleDecline}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>

            
           
        </div>
    );
};

export default TermsAndConditions;