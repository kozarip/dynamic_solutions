
# Peter Kozari - Dynamic Solutions Test Task

#### UI

I'm not using any UI framework, because it's not necessary. I think this project is very simple, every element can design with some lines of css.

Material UI or just simple Bootstrap should be a good alternative.

#### State Management

I suppose, React Context is enough for global state management because the project is simple so I store only one object in the global state

Possible alternatives::
* props chain: pass the user object via the props
* redux: is a little bit more complicated than the react context, using is not necessary

#### Form Validation

I'm using semantic input elements which have built-in validation and I'm using an image uploader component that also has its own validator. Image errors appear in a simple Alert box, it's a little bit ugly, if I would have more time, I change it to a pretty modal.

#### Hosting

The webapp is live on the https://main.d28xk34pizcx9m.amplifyapp.com/ URL. I host it in the AWS with the Amplify service.