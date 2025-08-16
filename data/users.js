import User from '../models/UserModel.js'

export const users = [
    new User(
    1, // Id
    "Yasser", // Name
    "yasser@example.com", // Email
    "123456", // Password
    "Admin" // Role 
    ),
    new User(
    'sosamaexamplecom', // Id
    "Ahmed Osama", 
    "osama@example.com", 
    "123456", 
    "Seller" 
    ),
    new User(
    'sazzaexamplecom', // Id
    "Azza", 
    "azza@example.com", 
    "123456", 
    "Seller" 
    ),
    new User(
    'smariamexamplecom', // Id
    "Mariam", 
    "mariam@example.com", 
    "123456", 
    "Seller" 
    ),
    
    new User(
    3, // Id
    "Ahmed Beltagy", 
    "beltagy@example.com", 
    "123456", 
    "User" 
    ),
    
    
];
