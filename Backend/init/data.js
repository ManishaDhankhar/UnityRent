const sampleProducts = [
    {
        category: { type: String, required: true, enum: ["Academic", "Residential", "Commercial", "Furniture", "Electronics"], default: "Academic", value: "Academic" },
        title: { type: String, required: true, trim: true, value: "Scientific Calculator Casio fx-991EX" },
        description: { type: String, required: true, value: "Perfect for engineering students. High-resolution display allowed in exams." },
        image: { type: String, default: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90", value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, default: "RENT", value: "RENT" },
            ratePerDay: { type: Number, required: true, min: 0, value: 15 },
            securityDeposit: { type: Number, default: 0, value: 500 },
            aiSuggestedPrice: { type: Number, value: 12 }
        }, 
        status: { type: String, enum: ["AVAILABLE", "RENTED", "MAINTENANCE"], default: "AVAILABLE", value: "AVAILABLE" },
        condition: { type: String, enum: ["New", "Like New", "Good", "Fair"], default: "Good", value: "Like New" },
        locationTag: { type: String, required: true, value: "Hostel Block A" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "Electric Kettle (1.5 Litre)" },
        description: { type: String, value: "Stainless steel body, fast boiling. Best for hostel Maggi nights." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 20 },
            securityDeposit: { type: Number, value: 300 },
            aiSuggestedPrice: { type: Number, value: 18 }
        },
        status: { type: String, enum: ["AVAILABLE", "RENTED", "MAINTENANCE"], value: "AVAILABLE" },
        condition: { type: String, enum: ["New", "Like New", "Good", "Fair"], value: "Good" },
        locationTag: { type: String, value: "Hostel Block B" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "Single Burner Induction Stove" },
        description: { type: String, value: "2000W high power induction for daily hostel cooking." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 40 },
            securityDeposit: { type: Number, value: 1000 },
            aiSuggestedPrice: { type: Number, value: 35 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Good" },
        locationTag: { type: String, value: "Hostel Block C" }
    },
    {
        category: { type: String, value: "Furniture" },
        title: { type: String, value: "Single Bed Mattress" },
        description: { type: String, value: "Soft foam mattress, 3x6 feet. Clean and well-maintained." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 25 },
            securityDeposit: { type: Number, value: 800 },
            aiSuggestedPrice: { type: Number, value: 20 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Fair" },
        locationTag: { type: String, value: "Hostel Block A" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "External Monitor 24-inch" },
        description: { type: String, value: "Full HD 1080p IPS monitor for coding and design." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 100 },
            securityDeposit: { type: Number, value: 3000 },
            aiSuggestedPrice: { type: Number, value: 90 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Like New" },
        locationTag: { type: String, value: "Staff Quarters" }
    },
    {
        category: { type: String, value: "Academic" },
        title: { type: String, value: "Engineering Drawing Board" },
        description: { type: String, value: "A1 size board with T-square for 1st year graphics lab." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 10 },
            securityDeposit: { type: Number, value: 200 },
            aiSuggestedPrice: { type: Number, value: 10 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Good" },
        locationTag: { type: String, value: "Hostel Block D" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "Bicycle / Cycle (Hero Jet)" },
        description: { type: String, value: "Single speed cycle, best for campus commuting." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 30 },
            securityDeposit: { type: Number, value: 1500 },
            aiSuggestedPrice: { type: Number, value: 25 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Fair" },
        locationTag: { type: String, value: "Main Gate Parking" }
    },
    {
        category: { type: String, value: "Academic" },
        title: { type: String, value: "White Lab Coat (Size L)" },
        description: { type: String, value: "Mandatory cotton lab coat for practical exams." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 5 },
            securityDeposit: { type: Number, value: 100 },
            aiSuggestedPrice: { type: Number, value: 5 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Good" },
        locationTag: { type: String, value: "Hostel Block B" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "DSLR Camera (Canon EOS)" },
        description: { type: String, value: "Includes 18-55mm lens for college event photography." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 250 },
            securityDeposit: { type: Number, value: 5000 },
            aiSuggestedPrice: { type: Number, value: 200 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Like New" },
        locationTag: { type: String, value: "Hostel Block C" }
    },
    {
        category: { type: String, value: "Furniture" },
        title: { type: String, value: "Foldable Study Table" },
        description: { type: String, value: "Portable wooden table for laptop or books." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 10 },
            securityDeposit: { type: Number, value: 200 },
            aiSuggestedPrice: { type: Number, value: 8 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Good" },
        locationTag: { type: String, value: "Hostel Block A" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "High-Speed Table Fan" },
        description: { type: String, value: "Powerful fan with 3-speed control for summers." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 15 },
            securityDeposit: { type: Number, value: 400 },
            aiSuggestedPrice: { type: Number, value: 15 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Good" },
        locationTag: { type: String, value: "Hostel Block B" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "Mini Projector" },
        description: { type: String, value: "Portable LED projector for hostel movie nights." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 150 },
            securityDeposit: { type: Number, value: 2000 },
            aiSuggestedPrice: { type: Number, value: 130 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "New" },
        locationTag: { type: String, value: "Common Room B" }
    },
    {
        category: { type: String, value: "Academic" },
        title: { type: String, value: "DSA Textbook (Cormen)" },
        description: { type: String, value: "Essential guide for placement preparation." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 5 },
            securityDeposit: { type: Number, value: 300 },
            aiSuggestedPrice: { type: Number, value: 5 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Good" },
        locationTag: { type: String, value: "Hostel Block D" }
    },
    {
        category: { type: String, value: "Electronics" },
        title: { type: String, value: "Rechargeable Drill Machine" },
        description: { type: String, value: "Power drill for DIY projects or room decor." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 60 },
            securityDeposit: { type: Number, value: 1500 },
            aiSuggestedPrice: { type: Number, value: 50 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "Good" },
        locationTag: { type: String, value: "Lab Area" }
    },
    {
        category: { type: String, value: "Academic" },
        title: { type: String, value: "Laptop Stand (Ergonomic)" },
        description: { type: String, value: "Aluminum stand to improve study posture." },
        image: { type: String, value: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90" },
        pricing: {
            type: { type: String, value: "RENT" },
            ratePerDay: { type: Number, value: 10 },
            securityDeposit: { type: Number, value: 200 },
            aiSuggestedPrice: { type: Number, value: 10 }
        },
        status: { type: String, value: "AVAILABLE" },
        condition: { type: String, value: "New" },
        locationTag: { type: String, value: "Hostel Block A" }
    }
];

module.exports = sampleProducts;