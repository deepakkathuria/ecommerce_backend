// const { Router } = require("express");

// const home = require("../controllers/index");
// const product = require("../controllers/product");
// const auth = require("../controllers/auth");
// const cart = require("../controllers/cart");
// const user = require("../controllers/user");
// const stripe = require("../controllers/stripe");
// const review = require("../controllers/review");
// const { upload } = require("../config/multer");
// const seeder = require("../controllers/seeders");


// const router = Router();

// router.get("/", home);
// router.get("/products", product.getProducts);
// router.get("/product/:id", product.getProductById);
// router.get("/category/:category", product.getProductByCategory);
// router.post("/auth/signup", auth.signUp);
// router.post("/auth/signin", auth.signIn);
// router.get("/cart", cart.getCart);
// router.post("/cart/add", cart.addToCart);
// router.delete("/cart/remove/:product_id", cart.removeFromCart);
// router.delete("/cart/clear", cart.clearCart);
// router.get("/user", user.getUser);
// router.post("/user/upload", upload.single("file"), user.uploadFile);
// router.put("/user/update", user.updateUser);
// router.post("/create-payment-intent", stripe.createPaymentIntent);
// router.get("/reviews", review.getReviews);
// router.get("/review/:id", review.getReviewById);
// router.post("/reviews/create", review.createReview);
// router.post("/seed", seeder.seedDatabase);


// module.exports = router;
// export {};







const { Router } = require("express");

// Controllers
const home = require("../controllers/index");
const product = require("../controllers/product");
const auth = require("../controllers/auth");
const cart = require("../controllers/cart");
const user = require("../controllers/user");
const stripe = require("../controllers/stripe");
const review = require("../controllers/review");
const { upload } = require("../config/multer");
const seeder = require("../controllers/seeders");
const order = require("../controllers/order"); // Import Order Controller

const router = Router();

/** Home Route */
router.get("/", home);

/** Product Routes */
router.get("/products", product.getProducts);
router.get("/product/:id", product.getProductById);
router.get("/category/:category", product.getProductByCategory);

/** Authentication Routes */
router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);

/** Cart Routes */
router.get("/cart", cart.getCart);
router.post("/cart/add", cart.addToCart);
router.delete("/cart/remove/:product_id", cart.removeFromCart);
router.delete("/cart/clear", cart.clearCart);

/** User Routes */
router.get("/user", user.getUser);
router.post("/user/upload", upload.single("file"), user.uploadFile);
router.put("/user/update", user.updateUser);

/** Payment Routes */
router.post("/create-payment-intent", stripe.createPaymentIntent);

/** Review Routes */
router.get("/reviews", review.getReviews);
router.get("/review/:id", review.getReviewById);
router.post("/reviews/create", review.createReview);

/** Seeder Route */
router.post("/seed", seeder.seedDatabase);

/** Order Routes */
router.post("/orders/create", order.createOrder); // Create Order
router.get("/orders/user", order.getUserOrders); // Get User's Orders
router.get("/orders/:orderId", order.getOrderDetails); // Get Order by ID
router.patch("/orders/:orderId", order.updateOrderStatus); // Update Order Status
router.delete("/orders/:orderId", order.deleteOrder); // Delete Order

/** Order Address Routes */
router.post("/orders/:orderId/address", order.addOrderAddress); // Add Order Address
router.get("/orders/:orderId/address", order.getOrderAddress); // Get Order Address
router.patch("/orders/address/:addressId", order.updateOrderAddress); // Update Order Address
router.delete("/orders/address/:addressId", order.deleteOrderAddress); // Delete Order Address

module.exports = router;
export {};
