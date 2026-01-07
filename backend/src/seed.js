import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { connectDB, disconnectDB } from "./config/db.js";
import { User, Role, Permission, Category, Book } from "./models/index.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env"
    : `.env.${process.env.NODE_ENV || "development"}`;

const cwd = process.cwd();
const preferredDevEnv = path.join(cwd, ".env.development");
const envPath = path.join(cwd, envFile);

if (!process.env.NODE_ENV && fs.existsSync(preferredDevEnv)) {
  dotenv.config({ path: preferredDevEnv });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

// Seed database with roles, permissions, and default users.
const seed = async () => {
  await connectDB();

  console.log("Starting database seed...");

  // Create Roles
  const roleNames = ["admin", "manager", "user"];
  const roleMap = {};

  for (const name of roleNames) {
    let role = await Role.findOne({ name });
    if (!role) {
      role = await Role.create({
        name,
        description: `${name} role`,
      });
    }
    roleMap[name] = role;
  }

  console.log("Roles created/updated");

  // Create Permissions
  const permissions = [
    { name: "users.read", resource: "users", action: "read" },
    { name: "users.create", resource: "users", action: "create" },
    { name: "users.update", resource: "users", action: "update" },
    { name: "users.delete", resource: "users", action: "delete" },
    { name: "roles.read", resource: "roles", action: "read" },
    { name: "roles.update", resource: "roles", action: "update" },
    { name: "upload.create", resource: "upload", action: "create" },
    { name: "health.read", resource: "health", action: "read" },
    { name: "auth.refresh", resource: "auth", action: "refresh" },
    { name: "auth.logout", resource: "auth", action: "logout" },
  ];

  const permissionMap = {};

  for (const perm of permissions) {
    let permission = await Permission.findOne({ name: perm.name });
    if (!permission) {
      permission = await Permission.create({
        name: perm.name,
        description: `${perm.name} permission`,
        resource: perm.resource,
        action: perm.action,
      });
    }
    permissionMap[perm.name] = permission;
  }

  console.log("Permissions created/updated");

  // Assign permissions to roles
  const allPermissions = Object.values(permissionMap).map((p) => p._id);

  roleMap.admin.permissions = allPermissions;
  await roleMap.admin.save();

  roleMap.manager.permissions = [
    "users.read",
    "users.create",
    "users.update",
    "roles.read",
    "upload.create",
    "health.read",
  ].map((name) => permissionMap[name]._id);
  await roleMap.manager.save();


  roleMap.user.permissions = ["health.read", "auth.refresh", "auth.logout"].map(
    (name) => permissionMap[name]._id
  );
  await roleMap.user.save();

  console.log("Permissions assigned to roles");

  // Create Users
  const usersToSeed = [
    { email: "admin@example.com", first: "Admin", last: "User", role: "admin" },
    {
      email: "manager@example.com",
      first: "Manager",
      last: "User",
      role: "manager",
    },
    { email: "user1@example.com", first: "User", last: "One", role: "user" },
    { email: "user2@example.com", first: "User", last: "Two", role: "user" },
    { email: "user3@example.com", first: "User", last: "Three", role: "user" },
    { email: "user4@example.com", first: "User", last: "Four", role: "user" },
    { email: "user5@example.com", first: "User", last: "Five", role: "user" },
    { email: "user6@example.com", first: "User", last: "Six", role: "user" },
  ];

  const hashedPassword = await bcrypt.hash("Password123!", 10);

  for (const user of usersToSeed) {
    const existing = await User.findOne({ email: user.email });
    if (!existing) {
      await User.create({
        email: user.email,
        password: hashedPassword,
        firstName: user.first,
        lastName: user.last,
        role: roleMap[user.role]._id,
        isActive: true,
      });
    }
  }

  console.log("Users created");

  // Seed book categories
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
    "Fantasy",
    "Mystery",
    "Romance",
    "Self-Help",
  ];

  for (const name of categories) {
    const existing = await Category.findOne({ name });
    if (!existing) {
      await Category.create({ name });
    }
  }

  console.log("Categories created");

  // Seed books
  const books = [
    {
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      price: 13.99,
      description: "A chilling dystopian novel about surveillance and control.",
      coverImage: "https://picsum.photos/seed/1984/400/600",
      stockQuantity: 14,
      categories: ["Fiction", "Science"],
      publisher: "Signet Classic",
      publicationDate: "1949-06-08",
      rating: 4.7,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0061120084",
      price: 14.99,
      description: "A powerful story about justice and empathy in the Deep South.",
      coverImage: "https://picsum.photos/seed/mockingbird/400/600",
      stockQuantity: 11,
      categories: ["Fiction", "History"],
      publisher: "Harper Perennial",
      publicationDate: "1960-07-11",
      rating: 4.8,
    },
    {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      isbn: "978-0062316097",
      price: 22.99,
      description: "An engaging exploration of humanity’s past and future.",
      coverImage: "https://picsum.photos/seed/sapiens/400/600",
      stockQuantity: 20,
      categories: ["Non-Fiction", "History"],
      publisher: "Harper",
      publicationDate: "2015-02-10",
      rating: 4.8,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      isbn: "978-0135957059",
      price: 49.99,
      description: "Timeless principles and practices for better software development.",
      coverImage: "https://picsum.photos/seed/pragmatic/400/600",
      stockQuantity: 6,
      categories: ["Technology", "Science"],
      publisher: "Addison-Wesley",
      publicationDate: "2019-09-13",
      rating: 4.8,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "978-0547928227",
      price: 12.49,
      description: "A classic fantasy adventure featuring Bilbo Baggins.",
      coverImage: "https://picsum.photos/seed/hobbit/400/600",
      stockQuantity: 18,
      categories: ["Fantasy", "Fiction"],
      publisher: "Mariner Books",
      publicationDate: "1937-09-21",
      rating: 4.8,
    },
    {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      isbn: "978-0756404741",
      price: 16.99,
      description: "A legendary tale of magic, music, and a gifted hero.",
      coverImage: "https://picsum.photos/seed/nameofthewind/400/600",
      stockQuantity: 9,
      categories: ["Fantasy", "Fiction"],
      publisher: "DAW",
      publicationDate: "2007-03-27",
      rating: 4.6,
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      isbn: "978-0441172719",
      price: 15.49,
      description: "Epic science fiction about power, prophecy, and a desert planet.",
      coverImage: "https://picsum.photos/seed/dune/400/600",
      stockQuantity: 13,
      categories: ["Science", "Fiction"],
      publisher: "Ace",
      publicationDate: "1965-08-01",
      rating: 4.7,
    },
    {
      title: "The Martian",
      author: "Andy Weir",
      isbn: "978-0804139021",
      price: 14.25,
      description: "A stranded astronaut uses science and humor to survive on Mars.",
      coverImage: "https://picsum.photos/seed/martian/400/600",
      stockQuantity: 10,
      categories: ["Science", "Fiction"],
      publisher: "Crown",
      publicationDate: "2014-02-11",
      rating: 4.6,
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      isbn: "978-0374533557",
      price: 19.99,
      description: "A deep dive into how we think, decide, and make mistakes.",
      coverImage: "https://picsum.photos/seed/fastslow/400/600",
      stockQuantity: 16,
      categories: ["Non-Fiction", "Self-Help"],
      publisher: "Farrar, Straus and Giroux",
      publicationDate: "2011-10-25",
      rating: 4.6,
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      isbn: "978-0857197689",
      price: 17.50,
      description: "Timeless lessons on wealth, greed, and happiness.",
      coverImage: "https://picsum.photos/seed/psychmoney/400/600",
      stockQuantity: 22,
      categories: ["Non-Fiction", "Self-Help"],
      publisher: "Harriman House",
      publicationDate: "2020-09-08",
      rating: 4.7,
    },
    {
      title: "Educated",
      author: "Tara Westover",
      isbn: "978-0399590504",
      price: 15.99,
      description: "A memoir about resilience, learning, and self-invention.",
      coverImage: "https://picsum.photos/seed/educated/400/600",
      stockQuantity: 12,
      categories: ["Biography", "Non-Fiction"],
      publisher: "Random House",
      publicationDate: "2018-02-20",
      rating: 4.7,
    },
    {
      title: "Becoming",
      author: "Michelle Obama",
      isbn: "978-1524763138",
      price: 18.99,
      description: "An inspiring memoir about identity, family, and public life.",
      coverImage: "https://picsum.photos/seed/becoming/400/600",
      stockQuantity: 15,
      categories: ["Biography", "Non-Fiction"],
      publisher: "Crown",
      publicationDate: "2018-11-13",
      rating: 4.8,
    },
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      isbn: "978-1250301697",
      price: 16.00,
      description: "A twisted psychological thriller with a shocking reveal.",
      coverImage: "https://picsum.photos/seed/silentpatient/400/600",
      stockQuantity: 7,
      categories: ["Mystery", "Fiction"],
      publisher: "Celadon Books",
      publicationDate: "2019-02-05",
      rating: 4.3,
    },
    {
      title: "Gone Girl",
      author: "Gillian Flynn",
      isbn: "978-0307588371",
      price: 15.99,
      description: "A dark mystery about marriage, media, and manipulation.",
      coverImage: "https://picsum.photos/seed/gonegirl/400/600",
      stockQuantity: 9,
      categories: ["Mystery", "Fiction"],
      publisher: "Crown",
      publicationDate: "2012-06-05",
      rating: 4.2,
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-1503290563",
      price: 9.99,
      description: "A witty romance about manners, class, and misunderstandings.",
      coverImage: "https://picsum.photos/seed/prideprejudice/400/600",
      stockQuantity: 19,
      categories: ["Romance", "Fiction"],
      publisher: "Public Domain Classics",
      publicationDate: "1813-01-28",
      rating: 4.6,
    },
    {
      title: "Me Before You",
      author: "Jojo Moyes",
      isbn: "978-0143124542",
      price: 13.50,
      description: "A heartfelt romance that challenges what it means to live fully.",
      coverImage: "https://picsum.photos/seed/mebeforeyou/400/600",
      stockQuantity: 8,
      categories: ["Romance", "Fiction"],
      publisher: "Penguin Books",
      publicationDate: "2012-01-05",
      rating: 4.4,
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      isbn: "978-1455586691",
      price: 17.99,
      description: "Rules for focused success in a distracted world.",
      coverImage: "https://picsum.photos/seed/deepwork/400/600",
      stockQuantity: 21,
      categories: ["Self-Help", "Non-Fiction"],
      publisher: "Grand Central Publishing",
      publicationDate: "2016-01-05",
      rating: 4.6,
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      isbn: "978-0812981605",
      price: 16.49,
      description: "How habits work and how to change them effectively.",
      coverImage: "https://picsum.photos/seed/powerhabit/400/600",
      stockQuantity: 17,
      categories: ["Self-Help", "Non-Fiction"],
      publisher: "Random House",
      publicationDate: "2012-02-28",
      rating: 4.5,
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      isbn: "978-0307887894",
      price: 18.00,
      description: "Build products smarter with rapid experiments and learning.",
      coverImage: "https://picsum.photos/seed/leanstartup/400/600",
      stockQuantity: 10,
      categories: ["Technology", "Non-Fiction"],
      publisher: "Crown Business",
      publicationDate: "2011-09-13",
      rating: 4.4,
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      isbn: "978-0804139298",
      price: 16.99,
      description: "Notes on startups, innovation, and building the future.",
      coverImage: "https://picsum.photos/seed/zerotoone/400/600",
      stockQuantity: 12,
      categories: ["Technology", "Non-Fiction"],
      publisher: "Crown Business",
      publicationDate: "2014-09-16",
      rating: 4.3,
    },
    {
      title: "The Innovators",
      author: "Walter Isaacson",
      isbn: "978-1476708690",
      price: 20.99,
      description: "A history of the pioneers who created the digital revolution.",
      coverImage: "https://picsum.photos/seed/innovators/400/600",
      stockQuantity: 9,
      categories: ["Technology", "Biography"],
      publisher: "Simon & Schuster",
      publicationDate: "2014-10-07",
      rating: 4.6,
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      isbn: "978-1451648539",
      price: 19.49,
      description: "A definitive biography of Apple’s co-founder.",
      coverImage: "https://picsum.photos/seed/stevejobs/400/600",
      stockQuantity: 7,
      categories: ["Biography", "Technology"],
      publisher: "Simon & Schuster",
      publicationDate: "2011-10-24",
      rating: 4.7,
    },
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "978-0553380163",
      price: 18.25,
      description: "Classic introduction to cosmology and the universe.",
      coverImage: "https://picsum.photos/seed/briefhistorytime/400/600",
      stockQuantity: 10,
      categories: ["Science", "Non-Fiction"],
      publisher: "Bantam",
      publicationDate: "1988-04-01",
      rating: 4.6,
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      isbn: "978-0345539434",
      price: 17.99,
      description: "A breathtaking journey through space and human discovery.",
      coverImage: "https://picsum.photos/seed/cosmos/400/600",
      stockQuantity: 13,
      categories: ["Science", "Non-Fiction"],
      publisher: "Ballantine Books",
      publicationDate: "1980-10-12",
      rating: 4.8,
    },
    {
      title: "The Immortal Life of Henrietta Lacks",
      author: "Rebecca Skloot",
      isbn: "978-1400052189",
      price: 16.99,
      description: "A true story at the intersection of science, ethics, and family.",
      coverImage: "https://picsum.photos/seed/henrietta/400/600",
      stockQuantity: 9,
      categories: ["Science", "Biography"],
      publisher: "Broadway Books",
      publicationDate: "2010-02-02",
      rating: 4.6,
    },
    {
      title: "The Wright Brothers",
      author: "David McCullough",
      isbn: "978-1476728759",
      price: 15.99,
      description: "A vivid account of the brothers who invented flight.",
      coverImage: "https://picsum.photos/seed/wright/400/600",
      stockQuantity: 8,
      categories: ["History", "Biography"],
      publisher: "Simon & Schuster",
      publicationDate: "2015-05-05",
      rating: 4.5,
    },
    {
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      isbn: "978-0307949486",
      price: 14.99,
      description: "A gripping mystery involving secrets, corruption, and revenge.",
      coverImage: "https://picsum.photos/seed/dragontattoo/400/600",
      stockQuantity: 11,
      categories: ["Mystery", "Fiction"],
      publisher: "Vintage",
      publicationDate: "2005-08-01",
      rating: 4.3,
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      isbn: "978-0307474278",
      price: 13.99,
      description: "A fast-paced mystery woven with symbols and history.",
      coverImage: "https://picsum.photos/seed/davinci/400/600",
      stockQuantity: 10,
      categories: ["Mystery", "Fiction"],
      publisher: "Anchor",
      publicationDate: "2003-03-18",
      rating: 4.1,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      isbn: "978-0061122415",
      price: 12.99,
      description: "A fable about following your dreams and finding your path.",
      coverImage: "https://picsum.photos/seed/alchemist/400/600",
      stockQuantity: 24,
      categories: ["Fiction", "Self-Help"],
      publisher: "HarperOne",
      publicationDate: "1993-05-01",
      rating: 4.4,
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "978-0316769488",
      price: 11.99,
      description: "A coming-of-age classic with an unforgettable voice.",
      coverImage: "https://picsum.photos/seed/catcher/400/600",
      stockQuantity: 12,
      categories: ["Fiction", "History"],
      publisher: "Little, Brown and Company",
      publicationDate: "1951-07-16",
      rating: 4.0,
    },
    {
      title: "The Road",
      author: "Cormac McCarthy",
      isbn: "978-0307387899",
      price: 14.49,
      description: "A haunting post-apocalyptic journey of a father and son.",
      coverImage: "https://picsum.photos/seed/theroad/400/600",
      stockQuantity: 6,
      categories: ["Fiction", "Science"],
      publisher: "Vintage",
      publicationDate: "2006-09-26",
      rating: 4.2,
    },
    {
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      isbn: "978-1594631931",
      price: 15.99,
      description: "A moving story of friendship, guilt, and redemption.",
      coverImage: "https://picsum.photos/seed/kiterunner/400/600",
      stockQuantity: 14,
      categories: ["Fiction", "History"],
      publisher: "Riverhead Books",
      publicationDate: "2003-05-29",
      rating: 4.6,
    },
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      isbn: "978-0590353427",
      price: 10.99,
      description: "A young wizard begins his journey at Hogwarts.",
      coverImage: "https://picsum.photos/seed/hp1/400/600",
      stockQuantity: 30,
      categories: ["Fantasy", "Fiction"],
      publisher: "Scholastic",
      publicationDate: "1998-09-01",
      rating: 4.9,
    },
    {
      title: "The Fellowship of the Ring",
      author: "J.R.R. Tolkien",
      isbn: "978-0547928210",
      price: 14.99,
      description: "The first chapter of an epic quest to destroy the One Ring.",
      coverImage: "https://picsum.photos/seed/lotr1/400/600",
      stockQuantity: 16,
      categories: ["Fantasy", "Fiction"],
      publisher: "Mariner Books",
      publicationDate: "1954-07-29",
      rating: 4.8,
    },
    {
      title: "Mistborn: The Final Empire",
      author: "Brandon Sanderson",
      isbn: "978-0765311788",
      price: 16.49,
      description: "A heist-like fantasy in a world of ash and metal-based magic.",
      coverImage: "https://picsum.photos/seed/mistborn/400/600",
      stockQuantity: 12,
      categories: ["Fantasy", "Fiction"],
      publisher: "Tor Books",
      publicationDate: "2006-07-17",
      rating: 4.8,
    },
    {
      title: "The Way of Kings",
      author: "Brandon Sanderson",
      isbn: "978-0765326355",
      price: 19.99,
      description: "A sweeping epic of war, honor, and ancient powers.",
      coverImage: "https://picsum.photos/seed/wayofkings/400/600",
      stockQuantity: 8,
      categories: ["Fantasy", "Fiction"],
      publisher: "Tor Books",
      publicationDate: "2010-08-31",
      rating: 4.9,
    },
    {
      title: "The Shining",
      author: "Stephen King",
      isbn: "978-0307743657",
      price: 15.99,
      description: "A suspense classic set in an isolated hotel.",
      coverImage: "https://picsum.photos/seed/shining/400/600",
      stockQuantity: 10,
      categories: ["Mystery", "Fiction"],
      publisher: "Anchor",
      publicationDate: "1977-01-28",
      rating: 4.5,
    },
    {
      title: "Rebecca",
      author: "Daphne du Maurier",
      isbn: "978-0380730407",
      price: 12.99,
      description: "A gothic mystery of secrets and haunting memories.",
      coverImage: "https://picsum.photos/seed/rebecca/400/600",
      stockQuantity: 9,
      categories: ["Mystery", "Fiction"],
      publisher: "Avon",
      publicationDate: "1938-08-01",
      rating: 4.4,
    },
    {
      title: "The Notebook",
      author: "Nicholas Sparks",
      isbn: "978-0446605236",
      price: 12.50,
      description: "A romantic story about love that endures over time.",
      coverImage: "https://picsum.photos/seed/notebook/400/600",
      stockQuantity: 13,
      categories: ["Romance", "Fiction"],
      publisher: "Warner Books",
      publicationDate: "1996-10-01",
      rating: 4.3,
    },
    {
      title: "Outlander",
      author: "Diana Gabaldon",
      isbn: "978-0440212560",
      price: 16.99,
      description: "A time-travel romance filled with history and adventure.",
      coverImage: "https://picsum.photos/seed/outlander/400/600",
      stockQuantity: 7,
      categories: ["Romance", "History"],
      publisher: "Dell",
      publicationDate: "1991-06-01",
      rating: 4.6,
    },
    {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      isbn: "978-1982137274",
      price: 18.99,
      description: "A classic framework for personal and professional effectiveness.",
      coverImage: "https://picsum.photos/seed/7habits/400/600",
      stockQuantity: 18,
      categories: ["Self-Help", "Non-Fiction"],
      publisher: "Simon & Schuster",
      publicationDate: "1989-08-15",
      rating: 4.6,
    },
    {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      isbn: "978-0671027032",
      price: 14.99,
      description: "Timeless advice for communication and relationships.",
      coverImage: "https://picsum.photos/seed/winfriends/400/600",
      stockQuantity: 20,
      categories: ["Self-Help", "Non-Fiction"],
      publisher: "Pocket Books",
      publicationDate: "1936-10-01",
      rating: 4.7,
    },
    {
      title: "The Art of War",
      author: "Sun Tzu",
      isbn: "978-1599869773",
      price: 8.99,
      description: "Strategic principles that influenced leadership for centuries.",
      coverImage: "https://picsum.photos/seed/artofwar/400/600",
      stockQuantity: 25,
      categories: ["History", "Non-Fiction"],
      publisher: "Classic Texts",
      publicationDate: "0500-01-01",
      rating: 4.4,
    },
    {
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      isbn: "978-0393317558",
      price: 18.99,
      description: "Why societies developed differently across the world.",
      coverImage: "https://picsum.photos/seed/gunsgermssteel/400/600",
      stockQuantity: 10,
      categories: ["History", "Science"],
      publisher: "W. W. Norton",
      publicationDate: "1997-03-01",
      rating: 4.5,
    },
    {
      title: "A People’s History of the United States",
      author: "Howard Zinn",
      isbn: "978-0062397348",
      price: 19.99,
      description: "History told from the perspective of everyday people.",
      coverImage: "https://picsum.photos/seed/peopleshistory/400/600",
      stockQuantity: 7,
      categories: ["History", "Non-Fiction"],
      publisher: "Harper Perennial",
      publicationDate: "1980-01-01",
      rating: 4.4,
    },
    {
      title: "The Code Book",
      author: "Simon Singh",
      isbn: "978-0385495325",
      price: 16.49,
      description: "A fascinating history of codes and cryptography.",
      coverImage: "https://picsum.photos/seed/codebook/400/600",
      stockQuantity: 9,
      categories: ["Science", "Technology"],
      publisher: "Anchor",
      publicationDate: "1999-09-07",
      rating: 4.5,
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      isbn: "978-1449373320",
      price: 54.99,
      description: "Modern patterns for reliable, scalable data systems.",
      coverImage: "https://picsum.photos/seed/ddia/400/600",
      stockQuantity: 4,
      categories: ["Technology", "Science"],
      publisher: "O'Reilly Media",
      publicationDate: "2017-03-16",
      rating: 4.9,
    },
    {
      title: "Refactoring",
      author: "Martin Fowler",
      isbn: "978-0134757599",
      price: 49.99,
      description: "Improving the design of existing code with practical techniques.",
      coverImage: "https://picsum.photos/seed/refactoring/400/600",
      stockQuantity: 5,
      categories: ["Technology", "Science"],
      publisher: "Addison-Wesley",
      publicationDate: "2018-11-19",
      rating: 4.8,
    },
    {
      title: "Introduction to Algorithms",
      author: "Cormen, Leiserson, Rivest, Stein",
      isbn: "978-0262046305",
      price: 89.99,
      description: "A foundational textbook on algorithms and complexity.",
      coverImage: "https://picsum.photos/seed/clrs/400/600",
      stockQuantity: 3,
      categories: ["Technology", "Science"],
      publisher: "MIT Press",
      publicationDate: "2022-04-05",
      rating: 4.7,
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      isbn: "978-0198788607",
      price: 15.99,
      description: "A classic look at evolution from the gene’s perspective.",
      coverImage: "https://picsum.photos/seed/selfishgene/400/600",
      stockQuantity: 8,
      categories: ["Science", "Non-Fiction"],
      publisher: "Oxford University Press",
      publicationDate: "1976-03-01",
      rating: 4.6,
    },
    {
      title: "A Short History of Nearly Everything",
      author: "Bill Bryson",
      isbn: "978-0767908184",
      price: 18.99,
      description: "A fun tour through science and the universe’s big questions.",
      coverImage: "https://picsum.photos/seed/nearlyeverything/400/600",
      stockQuantity: 12,
      categories: ["Science", "Non-Fiction"],
      publisher: "Broadway Books",
      publicationDate: "2003-05-06",
      rating: 4.7,
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      isbn: "978-0553296983",
      price: 10.99,
      description: "A moving diary from a young girl during World War II.",
      coverImage: "https://picsum.photos/seed/annefrank/400/600",
      stockQuantity: 17,
      categories: ["Biography", "History"],
      publisher: "Bantam",
      publicationDate: "1947-06-25",
      rating: 4.8,
    },
    {
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      isbn: "978-0316548182",
      price: 19.99,
      description: "The autobiography of Nelson Mandela’s extraordinary life.",
      coverImage: "https://picsum.photos/seed/mandela/400/600",
      stockQuantity: 9,
      categories: ["Biography", "History"],
      publisher: "Back Bay Books",
      publicationDate: "1994-11-01",
      rating: 4.8,
    },
    {
      title: "The Woman in the Window",
      author: "A.J. Finn",
      isbn: "978-0062678416",
      price: 15.99,
      description: "A thriller about secrets seen from behind a window.",
      coverImage: "https://picsum.photos/seed/womanwindow/400/600",
      stockQuantity: 6,
      categories: ["Mystery", "Fiction"],
      publisher: "William Morrow",
      publicationDate: "2018-01-02",
      rating: 4.1,
    },
    {
      title: "And Then There Were None",
      author: "Agatha Christie",
      isbn: "978-0062073488",
      price: 11.99,
      description: "A classic whodunit where guests vanish one by one.",
      coverImage: "https://picsum.photos/seed/none/400/600",
      stockQuantity: 14,
      categories: ["Mystery", "Fiction"],
      publisher: "William Morrow",
      publicationDate: "1939-11-06",
      rating: 4.6,
    },
    {
      title: "The Time Traveler's Wife",
      author: "Audrey Niffenegger",
      isbn: "978-1939126016",
      price: 14.99,
      description: "A love story shaped by time, chance, and separation.",
      coverImage: "https://picsum.photos/seed/timetravelwife/400/600",
      stockQuantity: 8,
      categories: ["Romance", "Fiction"],
      publisher: "Scribner",
      publicationDate: "2003-09-01",
      rating: 4.2,
    },
    {
      title: "It Ends with Us",
      author: "Colleen Hoover",
      isbn: "978-1501110368",
      price: 14.25,
      description: "A contemporary romance about difficult choices and growth.",
      coverImage: "https://picsum.photos/seed/itends/400/600",
      stockQuantity: 12,
      categories: ["Romance", "Fiction"],
      publisher: "Atria Books",
      publicationDate: "2016-08-02",
      rating: 4.6,
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      isbn: "978-0062457714",
      price: 16.99,
      description: "A counterintuitive approach to living a good life.",
      coverImage: "https://picsum.photos/seed/subtleart/400/600",
      stockQuantity: 18,
      categories: ["Self-Help", "Non-Fiction"],
      publisher: "Harper",
      publicationDate: "2016-09-13",
      rating: 4.3,
    },
    {
      title: "The Four Agreements",
      author: "Don Miguel Ruiz",
      isbn: "978-1878424310",
      price: 12.99,
      description: "Simple principles for personal freedom and clarity.",
      coverImage: "https://picsum.photos/seed/fouragreements/400/600",
      stockQuantity: 20,
      categories: ["Self-Help", "Non-Fiction"],
      publisher: "Amber-Allen Publishing",
      publicationDate: "1997-11-07",
      rating: 4.6,
    },
    {
      title: "A Game of Thrones",
      author: "George R.R. Martin",
      isbn: "978-0553593716",
      price: 17.99,
      description: "Noble houses clash in a brutal and political fantasy world.",
      coverImage: "https://picsum.photos/seed/got1/400/600",
      stockQuantity: 9,
      categories: ["Fantasy", "Fiction"],
      publisher: "Bantam",
      publicationDate: "1996-08-06",
      rating: 4.7,
    },
  ];

  for (const book of books) {
    const existing = await Book.findOne({ isbn: book.isbn });
    if (!existing) {
      await Book.create({
        ...book,
        publicationDate: new Date(book.publicationDate),
      });
    }
  }

  console.log("Books created");
  console.log("Database seeded successfully!");

  await disconnectDB();
  process.exit(0);
};

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
