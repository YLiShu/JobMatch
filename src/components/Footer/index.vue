<template>
    <footer class="footer">
        <div class="container">
            <div class="content">
                <div class="left">
                    <p>&copy; 2024 JobMatch - All Rights Reserved.</p>
                </div>
                <div class="right">
                    <a href="#privacy-policy">Privacy Policy</a>
                    <a href="#terms-of-service">Terms of Service</a>
                    <a href="#contact-us">Contact Us</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
</script>

<style scoped lang="scss">
.footer {
    background-color: #313438;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    z-index: 999;
    font-family: "Helvetica Neue", "Microsoft YaHei", Helvetica, Arial,
        sans-serif;
    color: white;
    padding: 20px 0;
    font-size: 0.9rem;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;

        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .left p {
                margin: 0;
            }
            .right a {
                color: white;
                margin-left: 20px;
                text-decoration: none;
                transition: color 0.3s ease;

                &:hover {
                    color: #aaa;
                }
            }
        }
    }
}
</style>