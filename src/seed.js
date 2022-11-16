/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
  const users = [
    {
      userId: "sfOi6omKfVa3aAPbxtc8Q7UrPAg2",
      username: "carlos_sc00",
      fullName: "Carlos Sanchez",
      emailAddress: "carlossc999@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "stevejobs",
      fullName: "Steve Jobs",
      emailAddress: "steve@jobs.com",
      following: [],
      followers: ["sfOi6omKfVa3aAPbxtc8Q7UrPAg2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "markzckbrg",
      fullName: "Mark Zuckerberg",
      emailAddress: "mark@zuckeberg.com",
      following: [],
      followers: ["sfOi6omKfVa3aAPbxtc8Q7UrPAg2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "billgates",
      fullName: "Bill Gates",
      emailAddress: "bill@gates.com",
      following: [],
      followers: ["sfOi6omKfVa3aAPbxtc8Q7UrPAg2"],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  // eslint-disable-next-line prefer-const

  firebase
    .firestore()
    .collection("photos")
    .add(
      {
        photoId: 1,
        userId: "2",
        imageSrc: "/images/users/stevejobs/apple.jpg",
        caption: "Look at my product!",
        likes: [],
        comments: [
          {
            displayName: "markzckbrg",
            comment: "Looks nice.",
          },
          {
            displayName: "billgates",
            comment: "I wouldn't install Windows in it.",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      },
      {
        photoId: 3,
        userId: "3",
        imageSrc: "/images/users/markzckbrg/facebook.jpg",
        caption: "Join my new social media page!",
        likes: [],
        comments: [
          {
            displayName: "stevejobs",
            comment: "I'm not a Harvard student Mark.",
          },
          {
            displayName: "billgates",
            comment: "Is it free?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      },
      {
        photoId: 4,
        userId: "4",
        imageSrc: "/images/users/billgates/windows12.jpg",
        caption: "Coming soon!",
        likes: [],
        comments: [
          {
            displayName: "markzckbrg",
            comment: "Nice, I'll update my computer.",
          },
          {
            displayName: "stevejobs",
            comment: "Wait till you see our iPhone 15.",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      },
      {
        photoId: 2,
        userId: "sfOi6omKfVa3aAPbxtc8Q7UrPAg2",
        imageSrc: "/images/users/carlos_sc00/portfolio.jpg",
        caption: "Look at my Portfolio!",
        likes: [],
        comments: [
          {
            displayName: "markzckbrg",
            comment: "Looks so cool, post it on Facebook!",
          },
          {
            displayName: "stevejobs",
            comment: "Mark stop spamming",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      }
    );
}
