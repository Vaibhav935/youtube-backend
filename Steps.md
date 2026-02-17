<!-- JWT is a Bearer Token -->
<!-- Keeping all the edge cases in mind and coding like taking cookies form req.body or headers in case of mobile phone -->

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
13. Implementing user.controller and user.middleware in user.routes
14. Finally registered one user and multiple bug fixes.
15. Made collection in Postman.
16. Made login controller and authMiddleware and logout controller.
17. fs vs fs/promises error resolved.
18. Made refresh token endpoint.
19. Subscription model done.
20. Change password controller done.
    - learnings
      - used idPasswordCorrect method that i made manually and learned how important that is to make these kink of methods before.
21. getCurrentUser, updateUserDetails, updateImages (2 separate controllers) and updateChannelName done. Additionally changed all controllers names.
22. GetChannelProfile controller done with aggregation pipelines.
23. Watch history endpoint with sub pipelines done.
24. All user routes completed.
25. Comment, Like, Tweet and Playlist model done.

