<?php
try {
    $db = new PDO("sqlite:profile.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "CREATE TABLE IF NOT EXISTS interests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )";

    $db->exec($query);
    echo "Databáze 'profile.db' a tabulka 'interests' byly úspěšně vytvořeny.\n";

} catch (PDOException $e) {
    die("Chyba při práci s databází: " . $e->getMessage());
}
?>
