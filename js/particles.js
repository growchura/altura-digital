
tsParticles.load("particles-js", {
    background: {
        color: {
            value: "transparent"
        }
    },
    fpsLimit: 60,
    particles: {
        number: {
            value: 60
        },
        color: {
            value: "#19b5ff"
        },
        links: {
            enable: true,
            color: "#19b5ff",
            distance: 150,
            opacity: 0.2
        },
        move: {
            enable: true,
            speed: 1
        },
        opacity: {
            value: 0.5
        },
        size: {
            value: { min: 1, max: 4 }
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab"
            }
        },
        modes: {
            grab: {
                distance: 180
            }
        }
    }
});