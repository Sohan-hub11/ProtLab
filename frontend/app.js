// Create animated background elements
        const backgroundContainer = document.getElementById('background-container');
        
        // Create floating molecule particles
        for (let i = 0; i < 35; i++) {
            const particle = document.createElement('div');
            particle.classList.add('molecule-particle');
            
            // Random properties
            const size = Math.random() * 40 + 10;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 25;
            const colorOpacity = Math.random() * 0.2 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.backgroundColor = `rgba(100, 255, 218, ${colorOpacity})`;
            particle.style.animationDelay = `${delay}s`;
            
            backgroundContainer.appendChild(particle);
        }
        
        // Create protein chains
        for (let i = 0; i < 20; i++) {
            const chain = document.createElement('div');
            chain.classList.add('protein-chain');
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const rotation = Math.random() * 360;
            const delay = Math.random() * 10;
            
            chain.style.left = `${x}%`;
            chain.style.top = `${y}%`;
            chain.style.transform = `rotate(${rotation}deg)`;
            chain.style.animationDelay = `${delay}s`;
            
            backgroundContainer.appendChild(chain);
        }
        
        // Page Navigation Logic
        const pages = document.querySelectorAll('.page-container');
        const navLinks = document.querySelectorAll('.nav-link');
        const homeLogo = document.getElementById('home-logo');
        
        // Function to switch pages
        function switchPage(pageId) {
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });
        }
        
        // Navigation link click events
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                switchPage(pageId);
            });
        });
        
        // Logo click event to go home
        homeLogo.addEventListener('click', function() {
            switchPage('home-page');
        });
        
        // Home page CTA button to go to search
        document.getElementById('go-to-search').addEventListener('click', function() {
            switchPage('search-page');
        });
        
        // Search page home button
        document.getElementById('go-to-home').addEventListener('click', function() {
            switchPage('home-page');
        });
        
        // Explore visualization button
        document.getElementById('explore-visualization').addEventListener('click', function() {
            alert('In a real application, this would open an advanced 3D molecular visualization tool with interactive controls and detailed analysis features.');
        });
        
        // Create the circular molecular structure with orbiting balls
        const circularStructure = document.getElementById('circular-structure');
        let isRotationActive = true;
        let showConnections = true;
        let animationSpeed = 1;
        let isHighlighted = false;
        let connectionLines = [];
        
        // Ball data: position, size, label, type
        const ballData = [
            // Large balls (outer ring) - 6 balls
            { size: 'large', label: 'A0JLT2', type: 'hydrogen', color: '#64ffda', orbitRadius: 300 },
            { size: 'large', label: 'A0M8Q6', type: 'oxygen', color: '#64ffda', orbitRadius: 300 },
            { size: 'medium', label: 'A0FGR8', type: 'nitrogen', color: '#64ffda', orbitRadius: 300 },
            { size: 'large', label: 'A0JP26', type: 'carbon', color: '#64ffda', orbitRadius: 300 },
            { size: 'large', label: 'A0AVI4', type: 'sulfur', color: '#64ffda', orbitRadius: 300 },

            { size: 'medium', label: 'Q9NX7', type: 'calcium', color: '#a8b2d1', orbitRadius: 220 },
            { size: 'medium', label: 'Q86UW', type: 'sodium', color: '#a8b2d1', orbitRadius: 220 },
            { size: 'medium', label: 'P6299', type: 'potassium', color: '#a8b2d1', orbitRadius: 220 },
            { size: 'medium', label: 'P5074', type: 'magnesium', color: '#a8b2d1', orbitRadius: 220 },
            { size: 'medium', label: 'Q63ZY', type: 'chlorine', color: '#a8b2d1', orbitRadius: 220 },
            
            { size: 'large', label: 'B7ZLH0', type: 'zinc', color: '#8892b0', orbitRadius: 140 },
 
            { size: 'large', label: 'A1A5C7', type: 'cobalt', color: '#8892b0', orbitRadius: 140 },
            { size: 'large', label: 'UBE2QL1', type: 'nickel', color: '#8892b0', orbitRadius: 140 },
            
        ];
        
        // Create orbiting balls
        function createOrbitingBalls() {
            // Clear existing balls and connections
            document.querySelectorAll('.orbiting-ball').forEach(ball => ball.remove());
            document.querySelectorAll('.connection-line').forEach(line => line.remove());
            document.querySelectorAll('.floating-particle').forEach(particle => particle.remove());
            
            // Create balls
            ballData.forEach((ball, index) => {
                const ballElement = document.createElement('div');
                ballElement.className = `orbiting-ball ball-${ball.size}`;
                ballElement.textContent = ball.label;
                ballElement.dataset.index = index;
                ballElement.dataset.type = ball.type;
                
                // Set initial position based on index
                const angle = (index / (ball.size === 'large' ? 6 : ball.size === 'medium' ? 6 : 6)) * 2 * Math.PI;
                const radius = ball.orbitRadius;
                
                // Add specific animation based on size
                if (ball.size === 'large') {
                    ballElement.style.animation = `orbitOuter ${20 / animationSpeed}s infinite linear`;
                } else if (ball.size === 'medium') {
                    ballElement.style.animation = `orbitMiddle ${15 / animationSpeed}s infinite linear`;
                } else {
                    ballElement.style.animation = `orbitInner ${10 / animationSpeed}s infinite linear`;
                }
                
                // Add animation delay for staggered effect
                ballElement.style.animationDelay = `${index * 0.2}s`;
                
                // Customize appearance
                ballElement.style.background = `radial-gradient(circle at 30% 30%, ${ball.color}, #0a192f)`;
                
                // Add hover effect
                ballElement.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.3)';
                    this.style.zIndex = '100';
                    this.style.animationPlayState = 'paused';
                    this.style.boxShadow = 
                        `0 0 40px ${ball.color},
                        inset 0 0 20px rgba(255, 255, 255, 0.5)`;
                    
                    // Show info about this element
                    // const typeNames = {
                    //     'hydrogen': 'Hydrogen Atom',
                    //     'oxygen': 'Oxygen Atom',
                    //     'nitrogen': 'Nitrogen Atom',
                    //     'carbon': 'Carbon Atom',
                    //     'sulfur': 'Sulfur Atom',
                    //     'phosphorus': 'Phosphorus Atom',
                    //     'calcium': 'Calcium Ion',
                    //     'sodium': 'Sodium Ion',
                    //     'potassium': 'Potassium Ion',
                    //     'magnesium': 'Magnesium Ion',
                    //     'chlorine': 'Chlorine Ion',
                    //     'iron': 'Iron Ion',
                    //     'zinc': 'Zinc Ion',
                    //     'copper': 'Copper Ion',
                    //     'manganese': 'Manganese Ion',
                    //     'cobalt': 'Cobalt Ion',
                    //     'nickel': 'Nickel Ion',
                    //     'molybdenum': 'Molybdenum Ion'
                    // };
                    
                    // const proteinOverlay = document.querySelector('.protein-overlay');
                    // const proteinName = document.querySelector('.protein-name');
                    // const proteinDesc = document.querySelector('.protein-desc');
                    
                    // proteinName.textContent = `${typeNames[ball.type]} (${ball.label})`;
                    // proteinDesc.textContent = `This ${ball.type} atom plays a crucial role in protein structure and function. Click to explore more details about its molecular properties and bonding characteristics.`;
                    
                    // Ensure overlay is visible
                    proteinOverlay.style.transform = 'translateY(0)';
                });
                
                ballElement.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.zIndex = '10';
                    this.style.animationPlayState = 'running';
                    this.style.boxShadow = 
                        `0 0 25px rgba(100, 255, 218, 0.9),
                        inset 0 0 10px rgba(255, 255, 255, 0.3)`;
                });
                
                // Add click event
                ballElement.addEventListener('click', function() {
                    // Pulse animation on click
                    this.style.animation = 'ballPulse 0.5s ease-in-out';
                    
                    // Reset animation after pulse
                    setTimeout(() => {
                        if (ball.size === 'large') {
                            this.style.animation = `orbitOuter ${20 / animationSpeed}s infinite linear`;
                        } else if (ball.size === 'medium') {
                            this.style.animation = `orbitMiddle ${15 / animationSpeed}s infinite linear`;
                        } else {
                            this.style.animation = `orbitInner ${10 / animationSpeed}s infinite linear`;
                        }
                        this.style.animationDelay = `${index * 0.2}s`;
                    }, 500);
                    
                    // // Show alert with element info
                    // alert(`${ball.label} - ${ball.type.toUpperCase()} ATOM\n\nThis atom is part of the protein's molecular structure. In a real application, this would open detailed information about the atom's properties, bonding patterns, and role in protein function.`);
                });
                
                circularStructure.appendChild(ballElement);
            });
            
            // Create connection lines between some balls
            if (showConnections) {
                createConnectionLines();
            }
            
            // Create floating particles
            createFloatingParticles();
        }
        
        // Create connection lines between balls
        function createConnectionLines() {
            // Clear existing connections
            connectionLines.forEach(line => {
                if (line.parentNode) {
                    line.parentNode.removeChild(line);
                }
            });
            connectionLines = [];
            
            // Create connections between adjacent balls in each ring
            for (let i = 0; i < 6; i++) {
                // Outer ring connections
                createConnection(i, (i + 1) % 6, 'large');
                
                // Middle ring connections
                createConnection(6 + i, 6 + ((i + 1) % 6), 'medium');
                
                // Inner ring connections
                createConnection(12 + i, 12 + ((i + 1) % 6), 'small');
                
                // Connections between rings (some strategic connections)
                if (i % 2 === 0) {
                    // Connect outer to middle
                    createConnection(i, 6 + i, 'large', 'medium');
                    
                    // Connect middle to inner
                    createConnection(6 + i, 12 + i, 'medium', 'small');
                }
            }
        }
        
        // Helper function to create a connection line between two balls
        function createConnection(index1, index2, size1, size2 = size1) {
            const line = document.createElement('div');
            line.className = 'connection-line';
            
            // Position will be updated dynamically
            connectionLines.push(line);
            circularStructure.appendChild(line);
            
            // Function to update line position
            const updateLinePosition = () => {
                const ball1 = document.querySelector(`.orbiting-ball[data-index="${index1}"]`);
                const ball2 = document.querySelector(`.orbiting-ball[data-index="${index2}"]`);
                
                if (!ball1 || !ball2) return;
                
                const rect1 = ball1.getBoundingClientRect();
                const rect2 = ball2.getBoundingClientRect();
                const containerRect = circularStructure.getBoundingClientRect();
                
                const x1 = rect1.left + rect1.width / 2 - containerRect.left;
                const y1 = rect1.top + rect1.height / 2 - containerRect.top;
                const x2 = rect2.left + rect2.width / 2 - containerRect.left;
                const y2 = rect2.top + rect2.height / 2 - containerRect.top;
                
                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                
                line.style.width = `${length}px`;
                line.style.left = `${x1}px`;
                line.style.top = `${y1}px`;
                line.style.transform = `rotate(${angle}deg)`;
            };
            
            // Update line position initially and on animation frame
            updateLinePosition();
            
            // Update line position continuously (for moving balls)
            if (isRotationActive) {
                const updateInterval = setInterval(updateLinePosition, 50);
                line.dataset.updateInterval = updateInterval;
            }
        }
        
        // Create floating particles around the structure
        function createFloatingParticles() {
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                
                // Random properties
                const size = Math.random() * 8 + 4;
                const x = Math.random() * 600;
                const y = Math.random() * 600;
                const delay = Math.random() * 6;
                const duration = Math.random() * 4 + 4;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                
                circularStructure.appendChild(particle);
            }
        }
        
        // Initialize the structure
        createOrbitingBalls();
        
        // Structure control functions
        document.getElementById('toggle-rotation').addEventListener('click', function() {
            isRotationActive = !isRotationActive;
            
            const balls = document.querySelectorAll('.orbiting-ball');
            const outerRing = document.querySelector('.outer-ring');
            const innerRing = document.querySelector('.inner-ring');
            
            if (isRotationActive) {
                // Resume animations
                balls.forEach(ball => {
                    ball.style.animationPlayState = 'running';
                });
                outerRing.style.animationPlayState = 'running';
                innerRing.style.animationPlayState = 'running';
                
                this.innerHTML = '<i class="fas fa-pause"></i> Rotation On';
                this.classList.add('active');
            } else {
                // Pause animations
                balls.forEach(ball => {
                    ball.style.animationPlayState = 'paused';
                });
                outerRing.style.animationPlayState = 'paused';
                innerRing.style.animationPlayState = 'paused';
                
                this.innerHTML = '<i class="fas fa-play"></i> Rotation Off';
                this.classList.remove('active');
            }
        });
        
        document.getElementById('toggle-connections').addEventListener('click', function() {
            showConnections = !showConnections;
            
            const connections = document.querySelectorAll('.connection-line');
            
            if (showConnections) {
                // Show connections
                connections.forEach(conn => {
                    conn.style.display = 'block';
                });
                // Recreate connections if they were removed
                if (connections.length === 0) {
                    createConnectionLines();
                }
                
                this.innerHTML = '<i class="fas fa-link"></i> Hide Connections';
                this.classList.add('active');
            } else {
                // Hide connections
                connections.forEach(conn => {
                    conn.style.display = 'none';
                });
                
                this.innerHTML = '<i class="fas fa-unlink"></i> Show Connections';
                this.classList.remove('active');
            }
        });
        
        document.getElementById('change-speed').addEventListener('click', function() {
            // Cycle through speed options
            const speeds = [
                { value: 0.5, label: 'Slow' },
                { value: 1, label: 'Normal' },
                { value: 2, label: 'Fast' },
                { value: 3, label: 'Very Fast' }
            ];
            
            const currentIndex = speeds.findIndex(s => s.value === animationSpeed);
            const nextIndex = (currentIndex + 1) % speeds.length;
            animationSpeed = speeds[nextIndex].value;
            
            this.innerHTML = `<i class="fas fa-tachometer-alt"></i> Speed: ${speeds[nextIndex].label}`;
            
            // Update animation speeds
            createOrbitingBalls();
        });
        
        document.getElementById('highlight-balls').addEventListener('click', function() {
            isHighlighted = !isHighlighted;
            
            const balls = document.querySelectorAll('.orbiting-ball');
            
            if (isHighlighted) {
                // Highlight balls
                balls.forEach(ball => {
                    ball.style.animation = 'glow 1s infinite alternate, ' + ball.style.animation;
                    ball.style.boxShadow = 
                        '0 0 40px rgba(255, 255, 255, 0.9), ' +
                        'inset 0 0 20px rgba(255, 255, 255, 0.5)';
                });
                
                this.innerHTML = '<i class="fas fa-star"></i> Normal Balls';
                this.classList.add('active');
            } else {
                // Remove highlight
                balls.forEach(ball => {
                    ball.style.animation = ball.style.animation.replace(/glow 1s infinite alternate, /g, '');
                    ball.style.boxShadow = 
                        '0 0 25px rgba(100, 255, 218, 0.9), ' +
                        'inset 0 0 10px rgba(255, 255, 255, 0.3)';
                });
                
                this.innerHTML = '<i class="fas fa-star"></i> Highlight Balls';
                this.classList.remove('active');
            }
        });
        
        document.getElementById('reset-view').addEventListener('click', function() {
            // Reset all settings
            isRotationActive = true;
            showConnections = true;
            animationSpeed = 1;
            isHighlighted = false;
            
            // Update control buttons
            document.getElementById('toggle-rotation').innerHTML = '<i class="fas fa-pause"></i> Rotation On';
            document.getElementById('toggle-rotation').classList.add('active');
            
            document.getElementById('toggle-connections').innerHTML = '<i class="fas fa-link"></i> Hide Connections';
            document.getElementById('toggle-connections').classList.add('active');
            
            document.getElementById('change-speed').innerHTML = '<i class="fas fa-tachometer-alt"></i> Speed: Normal';
            
            document.getElementById('highlight-balls').innerHTML = '<i class="fas fa-star"></i> Highlight Balls';
            document.getElementById('highlight-balls').classList.remove('active');
            
            // Recreate structure with default settings
            createOrbitingBalls();
            
            // Resume animations
            const balls = document.querySelectorAll('.orbiting-ball');
            const outerRing = document.querySelector('.outer-ring');
            const innerRing = document.querySelector('.inner-ring');
            
            balls.forEach(ball => {
                ball.style.animationPlayState = 'running';
            });
            outerRing.style.animationPlayState = 'running';
            innerRing.style.animationPlayState = 'running';
        });
        
        // Search functionality
        const searchBtn = document.getElementById('search-action');
        const searchBox = document.getElementById('protein-search');
        
        searchBtn.addEventListener('click', function() {
            if (searchBox.value.trim() === '') {
                searchBox.placeholder = "Please enter a protein name, ID, or query...";
                searchBox.style.borderColor = "#ff6b6b";
                searchBox.style.boxShadow = "0 0 15px rgba(255, 107, 107, 0.4)";
                
                // Reset after 2 seconds
                setTimeout(() => {
                    searchBox.placeholder = "Examples: Insulin, APP, Human, P5087, organism_id:9606";
                    searchBox.style.borderColor = "rgba(100, 255, 218, 0.2)";
                    searchBox.style.boxShadow = "none";
                }, 2000);
            } else {
                searchBox.style.borderColor = "#64ffda";
                searchBox.style.boxShadow = "0 0 25px rgba(100, 255, 218, 0.4)";
                
                // Simulate search action
                searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
                searchBtn.disabled = true;
                
                // Reset after 1.5 seconds
                setTimeout(() => {
                    searchBtn.innerHTML = '<i class="fas fa-search"></i> Search Structures';
                    searchBtn.disabled = false;
                    alert(`Searching for "${searchBox.value}"...\n\nIn a real application, this would query the protein structure database and display 3D molecular visualizations with detailed structural information.`);
                }, 1500);
            }
        });
        
        // Add enter key support for search
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
        
        // Add focus effect to search box
        searchBox.addEventListener('focus', function() {
            this.style.borderColor = "#64ffda";
            this.style.boxShadow = "0 0 20px rgba(100, 255, 218, 0.3)";
            this.style.backgroundColor = "rgba(23, 42, 69, 0.9)";
        });
        
        searchBox.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = "rgba(100, 255, 218, 0.2)";
                this.style.boxShadow = "none";
                this.style.backgroundColor = "rgba(23, 42, 69, 0.6)";
            }
        });
        
        // Auto-change protein overlay text when not hovering
        const proteinNames = [
            { name: "Protein Molecular Structure", desc: "This interactive visualization represents a protein's molecular structure with orbiting atoms and dynamic connections." },
            { name: "Atomic Orbital Model", desc: "Visualization of atomic orbitals and molecular bonds in a protein structure, showing electron density and bonding patterns." },
            { name: "Molecular Dynamics Simulation", desc: "Real-time simulation of molecular movements and interactions within a protein's 3D structure." }
        ];
        
        let currentProteinIndex = 0;
        let isUserInteracting = false;
        
        function changeProteinDisplay() {
            if (isUserInteracting) return;
            
            const proteinOverlay = document.querySelector('.protein-overlay');
            const proteinName = document.querySelector('.protein-name');
            const proteinDesc = document.querySelector('.protein-desc');
            
            // Only update if overlay is not visible
            if (proteinOverlay.style.transform !== 'translateY(0px)') {
                // Fade out
                proteinOverlay.style.opacity = '0';
                
                setTimeout(() => {
                    // Update content
                    proteinName.textContent = proteinNames[currentProteinIndex].name;
                    proteinDesc.textContent = proteinNames[currentProteinIndex].desc;
                    
                    // Fade in
                    proteinOverlay.style.opacity = '1';
                    
                    // Move to next protein
                    currentProteinIndex = (currentProteinIndex + 1) % proteinNames.length;
                }, 500);
            }
        }
        
        // Track user interaction
        const molecularContainer = document.querySelector('.molecular-container');
        
        molecularContainer.addEventListener('mouseenter', function() {
            isUserInteracting = true;
        });
        
        molecularContainer.addEventListener('mouseleave', function() {
            isUserInteracting = false;
            // Reset overlay position when mouse leaves
            setTimeout(() => {
                const proteinOverlay = document.querySelector('.protein-overlay');
                proteinOverlay.style.transform = 'translateY(100%)';
            }, 1000);
        });
        
        // Start auto-changing protein display every 10 seconds
        setInterval(changeProteinDisplay, 10000);