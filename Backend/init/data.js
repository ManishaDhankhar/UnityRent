const sampleProducts = [
    {
        category: "Academic",
        title: "Scientific Calculator Casio fx-991EX",
        description: "Perfect for engineering students. High-resolution display allowed in exams.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 15,
            securityDeposit: 500,
            aiSuggestedPrice: 12
        },
        status: "AVAILABLE",
        condition: "Like New",
        locationTag: "Hostel Block A"
    },
    {
        category: "Electronics",
        title: "Electric Kettle (1.5 Litre)",
        description: "Stainless steel body, fast boiling. Best for hostel Maggi nights.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 20,
            securityDeposit: 300,
            aiSuggestedPrice: 18
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Hostel Block B"
    },
    {
        category: "Electronics",
        title: "Single Burner Induction Stove",
        description: "2000W high power induction for daily hostel cooking.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 40,
            securityDeposit: 1000,
            aiSuggestedPrice: 35
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Hostel Block C"
    },
    {
        category: "Furniture",
        title: "Single Bed Mattress",
        description: "Soft foam mattress, 3x6 feet. Clean and well-maintained.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 25,
            securityDeposit: 800,
            aiSuggestedPrice: 20
        },
        status: "AVAILABLE",
        condition: "Fair",
        locationTag: "Hostel Block A"
    },
    {
        category: "Electronics",
        title: "External Monitor 24-inch",
        description: "Full HD 1080p IPS monitor for coding and design.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 100,
            securityDeposit: 3000,
            aiSuggestedPrice: 90
        },
        status: "AVAILABLE",
        condition: "Like New",
        locationTag: "Staff Quarters"
    },
    {
        category: "Academic",
        title: "Engineering Drawing Board",
        description: "A1 size board with T-square for 1st year graphics lab.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 10,
            securityDeposit: 200,
            aiSuggestedPrice: 10
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Hostel Block D"
    },
    {
        category: "Electronics",
        title: "Bicycle / Cycle (Hero Jet)",
        description: "Single speed cycle, best for campus commuting.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 30,
            securityDeposit: 1500,
            aiSuggestedPrice: 25
        },
        status: "AVAILABLE",
        condition: "Fair",
        locationTag: "Main Gate Parking"
    },
    {
        category: "Academic",
        title: "White Lab Coat (Size L)",
        description: "Mandatory cotton lab coat for practical exams.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 5,
            securityDeposit: 100,
            aiSuggestedPrice: 5
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Hostel Block B"
    },
    {
        category: "Electronics",
        title: "DSLR Camera (Canon EOS)",
        description: "Includes 18-55mm lens for college event photography.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 250,
            securityDeposit: 5000,
            aiSuggestedPrice: 200
        },
        status: "AVAILABLE",
        condition: "Like New",
        locationTag: "Hostel Block C"
    },
    {
        category: "Furniture",
        title: "Foldable Study Table",
        description: "Portable wooden table for laptop or books.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 10,
            securityDeposit: 200,
            aiSuggestedPrice: 8
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Hostel Block A"
    },
    {
        category: "Electronics",
        title: "High-Speed Table Fan",
        description: "Powerful fan with 3-speed control for summers.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 15,
            securityDeposit: 400,
            aiSuggestedPrice: 15
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Hostel Block B"
    },
    {
        category: "Electronics",
        title: "Mini Projector",
        description: "Portable LED projector for hostel movie nights.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 150,
            securityDeposit: 2000,
            aiSuggestedPrice: 130
        },
        status: "AVAILABLE",
        condition: "New",
        locationTag: "Common Room B"
    },
    {
        category: "Academic",
        title: "DSA Textbook (Cormen)",
        description: "Essential guide for placement preparation.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 5,
            securityDeposit: 300,
            aiSuggestedPrice: 5
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Hostel Block D"
    },
    {
        category: "Electronics",
        title: "Rechargeable Drill Machine",
        description: "Power drill for DIY projects or room decor.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 60,
            securityDeposit: 1500,
            aiSuggestedPrice: 50
        },
        status: "AVAILABLE",
        condition: "Good",
        locationTag: "Lab Area"
    },
    {
        category: "Academic",
        title: "Laptop Stand (Ergonomic)",
        description: "Aluminum stand to improve study posture.",
        image: "https://rukminim2.flixcart.com/image/480/640/k9u8zgw0/calculator/c/s/q/casio-plus-2nd-edition-fx82es-original-imafrjhubycumwvq.jpeg?q=90",
        pricing: {
            type: "RENT",
            ratePerDay: 10,
            securityDeposit: 200,
            aiSuggestedPrice: 10
        },
        status: "AVAILABLE",
        condition: "New",
        locationTag: "Hostel Block A"
    }
];

module.exports = {data:sampleProducts};