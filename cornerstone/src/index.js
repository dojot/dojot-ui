/*
Use dynamic import here to allow webpack to interface with module federation code, this is a typical pattern for Module Federation. It gives the application the time necessary for negotiating the library versions to use and for loading them.

*/
import("./bootstrap");
