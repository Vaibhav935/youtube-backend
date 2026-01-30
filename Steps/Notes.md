<!-- JWT is a Bearer Token -->

1. Professional Backend Setup - Folder structure setup
2. Connected Database 
3. Server Setup
4. Implemented necessary middlewares (like for url encoding and json)
5. Understanding utils 
    - asyncHandler - for handling all async task of backend
    - ApiError - for setting a standard to send error 
    - ApiResponse - for setting a standard to send response
6. Made User and Video models.
7. Installed mongooseAggregatePaginate.
8. MySchema.pre() (hook)(middleware) implementing.
    - .pre - to run code just before saving data in db
9. Checking pass in UserSchema only
10. Written methods to generate Access and Refresh token in userSchema.
11. Implementing file uploads. Cloudinary and Multer.
12. Also using fs - filesystem given by nodejs.
13. 