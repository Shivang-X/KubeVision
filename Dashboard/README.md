
# Assignment 3


*  *Date Created*: 30 July 2024

*  *Last Modification Date*: 30 July 2024

*  *Assignment Frontend URL (Deployed Application)*: [<https://stayeasee.netlify.app/>](https://stayeasee.netlify.app/)

*  *Assignment Backend URL (Deployed Application)*: [<https://stayease-gitlab.onrender.com/>](https://stayease-gitlab.onrender.com/)

*  *Git URL of Group Repo.*: [<https://git.cs.dal.ca/sarvaiya/csci-5709-grp-02>](https://git.cs.dal.ca/sarvaiya/csci-5709-grp-02)

* *Git URL of my Branch.*: [<https://git.cs.dal.ca/sarvaiya/csci-5709-grp-02/-/tree/shivang?ref_type=heads>](https://git.cs.dal.ca/sarvaiya/csci-5709-grp-02/-/tree/shivang?ref_type=heads)

  
  

## Authors

  

* [Shivangkumar Kalpeshkuumar Patel](shivang.patel@dal.ca)

  

## Completed feature and related tasks  

**Feature:** Wishlist Property.

**Tasks:**

 1. View all wishlisted properties. (Needs login)
 2. Add a new property into wishlist. (Needs login)
 3. Remove a property from wishlist. (Needs login)

 **Description**
 
 The Wishlist feature enables users to save and manage their preferred hotels and properties for future bookings. By adding properties to their Wishlist, users can easily revisit their favorite options, compare them, and stay updated on availability and pricing. This feature enhances the booking experience by allowing users to keep track of their top choices and quickly access them whenever they’re ready to finalize their plans.


## List of files created

### Frontend

 1. ui/src/routes/wishlist.tsx
 2. ui/src/lib/queries.ts

### Backend 

 1. server/src/main/java/com/example/server/entities/User.java
 2. server/src/main/java/com/example/server/controller/WishlistController.java
 3. server/services/WishlistService.java
 4. server/services/impl/WishlistServiceImpl.java
 4. server/utils/ResponseUtils.java

## How to test my feature.
  
### View all wishlisted Items

Firstly user needs to log in to view all wishlisted Items. After logging in user can navigate to Wishlist page using the options given in the frontend.

url: /wishlist
    

### Add a new property to wishlist.

After logging in user can naviagte to the properties page where all the properties are listed and click the add to wishlist button on any property listed.

### Delete property.

For deleting a property from wishlist user can navigate to wishlist page using the options given in the frontend and click the remove property on any property listed in the wishlist.


## Getting Started

  

### Prerequisites

  

To have a local copy of this up and running on your local machine, follow below steps : 

You will need to set up the following things

- Java JDK 
- maven
- pnpm
- MySQL


Clone the Repository

```bash
 git clone https://git.cs.dal.ca/sarvaiya/csci-5709-grp-02.git
 ```
 OR
 ```bash
 git clone git@git.cs.dal.ca:sarvaiya/csci-5709-grp-02.git
```

Navigate to the directory

```
cd CSCI 5709 Grp-02
```

### Frontend Installation : 


navigate to frontend directory which is ui

```
cd ui
```

- Run the following command to install frontend dependencies:

```bash
pnpm install
```

- Run the following command to start the frontend
```
pnpm dev
```

Open the browser and go to http://localhost:5173/

  

### Backend Installation : 


Navigate to the server directory

```
cd CSCI 5709 Grp-02
cd server
```

Install dependencies

- Run the following command to install frontend dependencies:

```bash
mvn install
```

start springboot APP

- After installing dependencies, start the Spring Boot development server by running:

```bash
mvn spring boot:run
```

- After successful run of application, APIS will be available at:  [http://localhost:8080](http://localhost:8080).

  
## Deployment

  
**Frontend:**


- Link the GitHub/GitLab repository with [Netlify](https://app.netlify.com/).

#### 1 Login to Netlify: Sign up or log in at Netlify.
#### 2 Create a New Site:
 - Click "New site from Git".
 - Connect your GitHub account and select your repository.
#### 3 Configure Settings:
 - Build Command: npm run build
 - Publish Directory: /ui
 - Deploy: Click "Deploy site".

  
**Backend:**

#### 1 Login to Render: Sign up or log in at Render.
#### 2 Create a New Site:
 - Click "+ New".
 - Click Web Service
#### 3 Configure Settings:
 - Select Git Provider with repository
 - Click Connect
 - Name: CSCI 5709 Grp-02 
 - Language: Docker
 - Root Directory: main directory of the project
 - Instance Type: Free
 - Click Deploy Web Application

## Built With

* [React](https://react.dev/) - The Frontend Library
* [Create React App](https://create-react-app.dev/) - Tool to generate boilerplate code and structure of a React App
* [Shadcn](https://ui.shadcn.com/) - Component library
* [Spring Boot](https://spring.io/projects/spring-boot) - Java framework for creating APIs.
* [Maven](https://maven.apache.org/) - Dependancy and project managment for java project.
* [Java JDK 17](https://www.oracle.com/ca-en/java/technologies/downloads/) - Java development kit.
* [MySQL](https://www.mysql.com/) - SQL Database.

  

## Code References

### card.tsx

```jsx
import * as React from 'react';

import {cn} from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className,
    )}
    {...props}
  />
));
Card.displayName = 'Card';
```
  

### button.tsx

```jsx
import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export {Button, buttonVariants};

```

### query.tsx

```js
import {createQueryKeyStore} from '@lukemorales/query-key-factory';
import {stayeaseAxios} from './client';
import {
  GetPropertyResponse,
  GetReservationResponse,
  GetUserByTokenResponse,
} from './dto';

export const queryKeys = createQueryKeyStore({
  user: {
    get: (token?: string) => ({
      queryKey: [token],
      queryFn: () =>
        stayeaseAxios
          .get(`auth/me`)
          .then((res) => new GetUserByTokenResponse(res.data).payload),
    }),
  },
  wishlist: {
    list: () => ({
      queryKey: [''],
      queryFn: () =>
        stayeaseAxios
          .get(`wishlist/my-properties`)
          .then((res) => res.data as GetPropertyResponse['payload'][]),
    }),
  }
});


```

### Wishlist.tsx

```jsx
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {FaEye} from 'react-icons/fa';
import {IoIosHeart} from 'react-icons/io';
import {Separator} from '@/components/ui/separator';
import {queryKeys} from '@src/src/lib/queries';
import {useMutation, useQuery} from '@tanstack/react-query';
import {stayeaseAxios} from '@src/src/lib/client';
import {toast} from 'react-toastify';

export const Wishlist = () => {
  const navigate = useNavigate();

  const propertiesQuery = useQuery({...queryKeys.wishlist.list()});

  const deleteFromWishlistMutation = useMutation({
    mutationFn: (id: string) => stayeaseAxios.post(`wishlist/remove/${id}`),
    onSuccess: () => {
      propertiesQuery.refetch();
      toast.success(`Property removed from wishlist`);
    },
  });

  const removeFromWishList = async (id: string) => {
    deleteFromWishlistMutation.mutate(id);
  };

  return (
    <div className="mt-10 pr-20 pl-20">
      <h1 className="text-3xl font-extralight text-center">❤️ Your Wishlist</h1>
      <Separator className="w-4/12 mx-auto my-5" />

      <div className=" w-full mt-10 flex gap-8">
        <div className="w-9/12 flex flex-wrap gap-8">
          {propertiesQuery?.data?.map((home) => (
            <Card className="w-2/6" key={home.name}>
                  <img
                    className="h-48 w-full object-cover rounded-t-md"
                    src={home.images?.[0]?.img_url}
                  />
                  <CardHeader>
                    <CardTitle className="text-lg">{home.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {home.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-xs">
                      <span className="font-semibold">${home.price}/Night</span>
                      <span className="flex gap-2 ml-auto">
                        <span>📍</span> {home.location}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-1/2 m-1"
                      onClick={() => navigate(`/property/${home.id}`)}
                    >
                      <FaEye className="mr-4" />
                      View
                    </Button>

                      <Button
                        className="w-1/2"
                        onClick={() => removeFromWishList(home.id)}
                        variant="secondary"
                      >
                        <IoIosHeart className="mr-2" size={18} color="red" />
                        Remove
                      </Button>
                  </CardFooter>
                </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

```

The code above was created by adapting the code in [shadcn](https://ui.shadcn.com/) as shown below: 

- The code in [shadcn](https://ui.shadcn.com/docs/components/card) was used for reference for developing the User Interface.
- [shadcn](https://ui.shadcn.com/docs/components/card)'s code was used for creating cards with UI component library.
- [shadcn](https://ui.shadcn.com/docs/components/card)'s code was modified by changing card look and fields as per my task requirements.


## Acknowledgments

- The official documentation was instrumental in helping me understand the code and modify it to meet the requirements of form validation.

- The used libraries are : 
  * [React](https://react.dev/) - The Frontend Library
  * [Create React App](https://create-react-app.dev/) - Tool to generate boilerplate code and structure of a React App
  * [Shadcn](https://ui.shadcn.com/) - Component library
  * [Spring Boot](https://spring.io/projects/spring-boot) - Java framework for creating APIs.
  * [Maven](https://maven.apache.org/) - Dependancy and project managment for java project.
  * [Java JDK 17](https://www.oracle.com/ca-en/java/technologies/downloads/) - Java development kit.
  * [MySQL](https://www.mysql.com/) - SQL Database.