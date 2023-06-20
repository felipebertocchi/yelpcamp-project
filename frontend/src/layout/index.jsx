import React from 'react'

export default () => {
    return (
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class="mb-auto">
                <div>
                    <img class="float-md-left mt-1" src="src/assets/logo.png" alt="yelp-camp-logo" />
                    <nav class="nav nav-masthead justify-content-center float-md-right">
                        <a class="nav-link" href="/campgrounds">Campgrounds</a>
                        <a class="nav-link" href="/login">Login</a>
                        <a class="nav-link" href="/register">Register</a>
                        <a class="nav-link" href="/logout">Logout</a>
                    </nav>
                </div>
            </header>
            <main class="px-3">
                <img src="src/assets/logo.png" alt="yelp-camp-logo" />
                <p class="lead my-4">
                    Welcome to YelpCamp! <br /> Jump right in and explore our many campgrounds. <br />
                    Feel free to share some of your own and comment on others!
                </p>
                <a href="/campgrounds" class="btn btn-lg btn-secondary font-weight-bold border-white bg-white">View Campgrounds</a>
            </main>
            <footer class="footer py-3 mt-auto text-white-50">
                <span>&copy; YelpCamp 2023</span>
            </footer>
        </div>
    )
}