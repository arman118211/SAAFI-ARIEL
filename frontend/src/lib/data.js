export const offers = [
  {
    _id: "offer_123",
    title: "Summer Essentials Bundle",
    description: "Get ready for the season with our exclusive collection of premium items. Limited time offer with special bulk pricing.",
    startDate: new Date(Date.now() - 86400000).toISOString(), // Started yesterday
    endDate: new Date(Date.now() + 259200000).toISOString(), // Ends in 3 days
    status: "active",
    products: [
      {
        productId: {
          _id: "prod_1",
          name: "Premium Wireless Headphones",
          description: "Noise cancelling with 30h battery life",
          price: 299.99,
          unit: "piece",
          stock: 50,
          category: "Electronics",
          imageUrl: "/diverse-people-listening-headphones.png",
          isActive: true
        },
        minQty: 1
      },
      {
        productId: {
          _id: "prod_2",
          name: "Smart Fitness Watch",
          description: "Track your health metrics in real-time",
          price: 149.50,
          unit: "piece",
          stock: 120,
          category: "Electronics",
          imageUrl: "/modern-smartwatch.png",
          isActive: true
        },
        minQty: 2
      },
      {
        productId: {
          _id: "prod_3",
          name: "Portable Power Bank",
          description: "20000mAh fast charging capacity",
          price: 45.00,
          unit: "piece",
          stock: 200,
          category: "Accessories",
          imageUrl: "/portable-charger.png",
          isActive: true
        },
        minQty: 1
      }
    ]
  },
  {
    _id: "offer_456",
    title: "Tech Flash Sale",
    description: "Incredible deals on the latest gadgets. Don't miss out on these rock-bottom prices for a very limited time.",
    startDate: new Date(Date.now() - 172800000).toISOString(), // Started 2 days ago
    endDate: new Date(Date.now() + 18000000).toISOString(), // Ends in 5 hours
    status: "active",
    products: [
      {
        productId: {
          _id: "prod_2",
          name: "Smart Fitness Watch",
          description: "Track your health metrics in real-time",
          price: 129.99, // Discounted price
          unit: "piece",
          stock: 45,
          category: "Electronics",
          imageUrl: "/modern-smartwatch.png",
          isActive: true
        },
        minQty: 1
      },
      {
        productId: {
          _id: "prod_1",
          name: "Premium Wireless Headphones",
          description: "Noise cancelling with 30h battery life",
          price: 249.99, // Discounted price
          unit: "piece",
          stock: 15,
          category: "Electronics",
          imageUrl: "/diverse-people-listening-headphones.png",
          isActive: true
        },
        minQty: 1
      }
    ]
  },
  {
    _id: "offer_789",
    title: "Weekend Warrior Pack",
    description: "Everything you need for your weekend adventures. Durable, reliable, and ready for action.",
    startDate: new Date(Date.now() - 3600000).toISOString(), // Started 1 hour ago
    endDate: new Date(Date.now() + 604800000).toISOString(), // Ends in 1 week
    status: "active",
    products: [
      {
        productId: {
          _id: "prod_3",
          name: "Portable Power Bank",
          description: "20000mAh fast charging capacity",
          price: 39.99,
          unit: "piece",
          stock: 500,
          category: "Accessories",
          imageUrl: "/portable-charger.png",
          isActive: true
        },
        minQty: 2
      }
    ]
  }
]
