 function register(game, map, mode, time, date, prize, entry) {
        
        const url = `registration.html?game=${encodeURIComponent(game)}&map=${encodeURIComponent(map)}&mode=${encodeURIComponent(mode)}&time=${encodeURIComponent(time)}&date=${encodeURIComponent(date)}&prize=${encodeURIComponent(prize)}&entry=${encodeURIComponent(entry)}`;
        
        console.log("Navigating to:", url);
        window.location.href = url;
    }
