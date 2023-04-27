How to run the Project?
1. Need to install 'Angular cli' in the system before running the application using 'npm install -g @angular/cli'.
2. After installing angular cli, check the installation using 'ng version' in the command prompt. Make sure that the angular cli version is shown. if its shown, the installation is successfull.
3. Later, navigate to the 'book-worm' folder where you can see the 'src' or 'package.json' file.
4. Do 'npm install' to install all the required dependencies which will be stored in the 'node_modules' folder.
5. After the dependences required are installed, Run 'ng serve --open'
6. The application will be automatically opened in the default browser at port 4200 with the following url "https:localhost:4200".
7. We can register as many users as possible with the register page. one such user details are as follows:
    username: mnagulav
    password: @BookWorm987
8. For the Admin portal, we have maintained a particular user as admin with the following details:
    username: admin
    password: admin
9. For payment, we can use the following details
    4242424242424242	Visa	    Any 3 digits	Any future date
    5555555555554444	Mastercard	Any 3 digits	Any future date





# BookWorm
The online bookstore application is a platform that enables users to browse and purchase books. This web-application aims to provide a seamless experience for users who wish to buy books online. It will feature a user-friendly interface and easy navigation.

Features and Capabilities:
1. Profile Management:
The login page will allow users to log in to the platform as either an admin or a user.
Admins will have access to the admin dashboard where they can manage books, users, and
orders, while Users will have access to the user dashboard, where they can view their orders,
manage their profile, and track their orders.

User Dashboard:

2. Homepage, Book Browsing and Sorting:
The homepage will feature a carousel, which will display featured books, new releases,
and bestsellers. The search feature will allow users to browse/search for books using keywords,
book title. The search results will be displayed with filters such as price range, author. The book
catalog will display all the books available on the platform, with book details such as book title,
author name, book cover, book description, and price along with pagination based on 10 or 20
results.
3. Book Details:
When a user/admin clicks on a book, they will be taken to the book details page. Display
book title, book cover (which can be enlarged when clicked), author, book description, genre,
publishing info (publisher, release date, etc.), book rating, and comments.
4. Book Rating, Commenting and Sharing:
Users can find book reviews/ratings from previous buyers on this app. For Rating, Users
can rate any book. Use a five-star rating system. For Commenting, a single comment should be
limited to the number of characters. For Sharing, we can allow the user/admin to get a shareable
link in which the book details page can be shared on social media platforms such as Facebook,
Twitter, and Instagram.
5. Shopping Cart:
The 'add to cart' feature will allow users to add books to their shopping cart. Users will be
able to view the contents of their shopping cart, update the quantity of books, and remove books
from their shopping cart. When a user is ready to check out, they will be taken to the checkout
page, where they will be required to provide their billing and shipping details.
6. Checkout and Purchase:
The checkout page will require users to provide their billing and shipping details. Users
will be able to select a payment method such as credit/debit cards, PayPal. Once the payment
has been processed, the user will receive a confirmation email with the order details.

Admin Dashboard:

The admin role can view their homepage like the analytics dashboard featuring number
of books purchased, Number of registered users, number of low quantity products. He can also
visualize using charts the order details from the customers through monthly/yearly sales, sales
of the most popular books, which books are mostly purchased. In addition to this, he can also
manage the books, users and orders.

Conclusion:

In summary, this project aims to create an online book-store platform that will provide users with
a convenient and user-friendly platform to browse and purchase books. The web application will
have a login page, two types of users (admin and user), a homepage with a carousel, search
feature and filters, book catalog, book details, add to cart feature, checkout and purchase feature
and admin dashboard feature. The platform will be designed to be scalable and modular, making
it easy to add new features and functionalities in the future.
