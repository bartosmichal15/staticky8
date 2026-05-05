<?php
session_start();
require_once 'db.php';

// Načtení dat ze souboru profile.json pro jméno, dovednosti a projekty
$json_file = 'profile.json';
if (!file_exists($json_file)) {
    file_put_contents($json_file, json_encode(['name' => 'John Doe', 'skills' => [], 'interests' => [], 'projects' => []]));
}
$json_data = file_get_contents($json_file);
$profile = json_decode($json_data, true);

$name = htmlspecialchars($profile['name'] ?? 'Jméno nenalezeno');
$skills = $profile['skills'] ?? [];
$projects = $profile['projects'] ?? [];

// Logika routování
$page = $_GET['page'] ?? 'home';

switch ($page) {
    case 'home':
        $page_file = 'pages/home.php';
        break;
    case 'interests':
        $page_file = 'pages/interests.php';
        break;
    case 'skills':
        $page_file = 'pages/skills.php';
        break;
    default:
        $page_file = 'pages/not_found.php';
        break;
}
?>
<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $name; ?> | IT Profil</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        .main-nav {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .main-nav a {
            text-decoration: none;
            color: var(--text-main);
            background: rgba(255, 255, 255, 0.05);
            padding: 0.8rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 1px solid var(--glass-border);
        }
        .main-nav a:hover,
        .main-nav a.active {
            background: rgba(99, 102, 241, 0.2);
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
        }
    </style>
</head>

<body>
    <div class="glass-bg"></div>

    <main class="container">
        <header class="profile-header">
            <div class="avatar-container">
                <img src="avatar.png" alt="Profile" id="profile-img">
            </div>
            <h1><?php echo $name; ?></h1>
            <p class="subtitle">IT Student & Developer</p>
        </header>

        <nav class="main-nav">
            <a href="?page=home" class="<?php echo $page === 'home' ? 'active' : ''; ?>">Domů</a>
            <a href="?page=interests" class="<?php echo $page === 'interests' ? 'active' : ''; ?>">Zájmy</a>
            <a href="?page=skills" class="<?php echo $page === 'skills' ? 'active' : ''; ?>">Dovednosti</a>
        </nav>

        <?php require $page_file; ?>

    </main>
</body>

</html>
