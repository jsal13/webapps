const hobbyData = [
    {
        "name": "Coding",
        "beginner_badge": ["Write and run a 'Hello, World!' program in Python", "Create a program that uses at least 3 different data types (string, integer, list)", "Write a program that takes user input and displays a personalized message"],
        "intermediate_badge": ["Write a program with at least 5 if/else statements and 2 different loop types", "Create and use at least 3 custom functions in a single program", "Write a program that handles at least 2 types of exceptions with try/except blocks"],
        "expert_badge": ["Create a class with at least 5 methods and use inheritance", "Build a program that reads from and writes to a database with at least 10 records"],
        "capstone_project": "Build a full-stack web application using a modern framework."
    },
    {
        "name": "Photography",
        "beginner_badge": ["Take 25 photos in manual mode demonstrating correct exposure (not over/underexposed)", "Capture 100 photos total using only manual camera settings", "Take 20 photos that clearly demonstrate rule of thirds composition"],
        "intermediate_badge": ["Take 10 photos each in golden hour, blue hour, and harsh midday lighting", "Edit 50 photos in Lightroom or similar software with at least 5 adjustments each", "Capture 15 photos each in portrait, landscape, and street photography genres"],
        "expert_badge": ["Create a portfolio of 50 photos that demonstrate a consistent editing style and subject approach", "Complete 25 photos using advanced techniques like focus stacking, HDR, or composite editing"],
        "capstone_project": "Create a cohesive photo series or exhibition with 20-30 images telling a story."
    },
    {
        "name": "Cooking",
        "beginner_badge": ["Demonstrate proper knife grip and safely dice an onion, julienne a carrot, and mince garlic", "Successfully execute these 5 techniques: sautéing, roasting, boiling, pan-frying, and steaming", "Cook 10 different recipes from scratch without assistance, documenting each with photos"],
        "intermediate_badge": ["Cook 5 complete meals without following any recipes, using only ingredients on hand", "Make 3 mother sauces (béchamel, velouté, hollandaise) and 5 pan sauces successfully", "Create 10 dishes that demonstrate complementary flavor pairings (sweet/salty, acid/fat, etc.)"],
        "expert_badge": ["Develop and test 5 original recipes, having others successfully recreate them from your written instructions", "Master 3 advanced techniques: complete a 24-hour sous vide cook, ferment vegetables for 2 weeks, or cure meat for 30 days"],
        "capstone_project": "Plan and execute a complete 7-course dinner party for friends or family."
    },
    {
        "name": "Gardening",
        "beginner_badge": ["Grow 5 different herbs from seed to harvest (basil, cilantro, parsley, etc.)", "Keep 10 plants alive for 3 months with proper watering schedule and care", "Create a working compost bin and identify 3 different soil types in your area"],
        "intermediate_badge": ["Plan, plant, and maintain a garden with 15+ plants through a complete growing season", "Successfully identify and treat 3 plant diseases and 3 pest problems using organic methods", "Propagate 10 plants using 3 different methods: cuttings, division, and seeds"],
        "expert_badge": ["Design and implement a garden system with companion planting, water conservation, and natural pest control for 50+ plants", "Successfully save seeds from 10 plant varieties and achieve 80%+ germination rates"],
        "capstone_project": "Create a self-sustaining garden that provides food year-round."
    },
    {
        "name": "Guitar",
        "beginner_badge": ["Play 8 open chords cleanly and switch between them smoothly with 4 different strumming patterns", "Perform 3 complete songs from start to finish without stopping, including singing or humming along", "Name all notes on the fretboard up to the 5th fret and explain major/minor chord construction"],
        "intermediate_badge": ["Play 5 fingerpicking patterns and perform 3 songs using fingerstyle technique", "Play 5 barre chords cleanly and perform major and minor scales in 3 positions", "Learn and perform 2 songs each from rock, folk, blues, and classical genres"],
        "expert_badge": ["Write 3 original songs with lyrics and chord progressions, performing them for others", "Play songs in 4 alternate tunings (Drop D, DADGAD, Open G, etc.) and demonstrate 3 advanced techniques like tapping or harmonics"],
        "capstone_project": "Record and produce a 4-song EP of original compositions."
    },
    {
        "name": "Fitness",
        "beginner_badge": ["Work out consistently for 30 days without missing more than 2 sessions", "Demonstrate proper form for 10 basic exercises (squats, push-ups, lunges, etc.) to a trainer or experienced person", "Complete a 5K run or walk in under 40 minutes"],
        "intermediate_badge": ["Design and follow a 12-week progressive training program with measurable improvements", "Perform 5 compound movements (deadlift, squat, bench press, etc.) with bodyweight or more", "Track macronutrients for 30 days and maintain target ratios within 5%"],
        "expert_badge": ["Create periodized training plans for 3 different fitness goals and coach someone through one", "Master 5 advanced movement patterns (Olympic lifts, pistol squats, muscle-ups, etc.)"],
        "capstone_project": "Complete a challenging fitness goal like a marathon, triathlon, or powerlifting competition."
    },
    {
        "name": "Woodworking",
        "beginner_badge": ["Pass a safety test on 10 basic woodworking tools and demonstrate proper use to an experienced woodworker", "Complete 3 simple projects: cutting board, simple box, and basic shelf", "Identify 10 different wood types by sight and explain grain direction in 5 pieces"],
        "intermediate_badge": ["Safely operate 8 power tools and complete projects using table saw, router, and planer", "Master 5 joinery techniques: dadoes, mortise & tenon, dovetails, finger joints, and biscuit joints", "Build 3 pieces of furniture: chair, table, and cabinet with drawers"],
        "expert_badge": ["Design and build 3 original furniture pieces from your own plans", "Cut 5 types of joints entirely by hand with professional-quality fit"],
        "capstone_project": "Design and build a piece of heirloom furniture using traditional joinery methods."
    },
    {
        "name": "Drawing",
        "beginner_badge": ["Draw 50 objects using basic shapes, demonstrating accurate proportions in 80% of drawings", "Complete at least 30 minutes of drawing practice daily for 30 consecutive days", "Create 20 drawings demonstrating 5 different shading techniques and 1-point, 2-point, and 3-point perspective"],
        "intermediate_badge": ["Complete 25 figure drawings and 25 detailed anatomical studies of hands, eyes, and faces", "Create 15 finished drawings each in pencil, charcoal, ink, and colored pencil", "Draw 30 objects from life in under 15 minutes each, capturing accurate proportions and details"],
        "expert_badge": ["Create 25 drawings in a consistent personal style that others can identify as your work", "Master 3 advanced techniques: cross-hatching, stippling, and blending, creating 10 drawings each"],
        "capstone_project": "Create a portfolio of 20 finished drawings demonstrating mastery across different subjects and techniques."
    },
    {
        "name": "Bass Guitar",
        "beginner_badge": ["Maintain proper posture and hand positioning for 30-minute practice sessions without strain", "Play 10 basslines using proper fingering technique with clean note articulation", "Play along with 15 songs in 4/4 time, staying perfectly in rhythm for entire songs"],
        "intermediate_badge": ["Perform 10 songs using slap and pop techniques with clear, punchy sounds", "Play 5 walking basslines in jazz standards with smooth quarter-note movement", "Learn and perform 3 songs each in rock, funk, jazz, reggae, and Latin styles"],
        "expert_badge": ["Perform 5 bass solos of 32 bars each using scales, arpeggios, and melodic lines", "Play 10 songs in odd time signatures (5/4, 7/8, etc.) and 5 songs with complex polyrhythms"],
        "capstone_project": "Record a full album as the primary bass player with complex arrangements."
    },
    {
        "name": "Drums",
        "beginner_badge": ["Demonstrate proper matched and traditional grip, maintaining good posture for 20-minute sessions", "Play 10 basic beats (rock, pop, shuffle, etc.) and 20 fills cleanly at various tempos", "Complete 15 limb independence exercises, playing different patterns with hands and feet simultaneously"],
        "intermediate_badge": ["Play 3 songs each in rock, jazz, Latin, funk, and metal genres with authentic feel", "Master 40 rudiments from the Percussive Arts Society list at performance tempo", "Control dynamics across 5 levels (pp to ff) and incorporate ghost notes in 10 groove patterns"],
        "expert_badge": ["Play 10 polyrhythmic exercises (3 against 2, 4 against 3, etc.) and 5 polymetric patterns", "Perform 15 songs in odd time signatures (5/4, 7/8, 9/8, etc.) with musical phrasing"],
        "capstone_project": "Perform a 45-minute solo drum concert demonstrating technical mastery across genres."
    },
    {
        "name": "Singing",
        "beginner_badge": ["Demonstrate diaphragmatic breathing for 5 minutes and maintain proper posture while singing 10 songs", "Accurately sing your complete vocal range (lowest to highest note) and identify it in musical terms", "Sing 15 simple songs completely in tune, as verified by a tuning app or musician"],
        "intermediate_badge": ["Sustain notes for 20+ seconds using proper breath support and sing through 30-minute sessions without vocal fatigue", "Complete 20 different vocal warm-up exercises daily for 2 weeks", "Perform 5 songs each in classical, pop, jazz, folk, and musical theater styles with appropriate technique"],
        "expert_badge": ["Master 5 advanced techniques: vibrato, runs, belting, falsetto, and vocal fry, demonstrating each in performance", "Perform 3 solo concerts of 45+ minutes each with stage presence, audience engagement, and no vocal strain"],
        "capstone_project": "Perform a solo recital with 12 songs showcasing technical and artistic range."
    },
    {
        "name": "Improv",
        "beginner_badge": ["Practice 'yes, and' in 50 scene exercises without blocking or denying scene partner's offers", "Demonstrate active listening by successfully building on scene partner's ideas in 25 two-person scenes", "Perform 20 simple scene exercises with clear beginning, middle, and end"],
        "intermediate_badge": ["Create and sustain 15 distinct characters with unique voices, physicality, and motivations", "Successfully perform 10 different improv formats (freeze tag, conducted story, etc.) as both participant and host", "Lead 10 scenes by supporting scene partners and making them look good"],
        "expert_badge": ["Design and teach 5 different improv workshop curricula to groups of 8+ people", "Perform 3 long-form narrative improvisations of 45+ minutes each with coherent story arcs"],
        "capstone_project": "Write and direct an improvised show format and perform it for a live audience."
    },
    {
        "name": "Musical Improv",
        "beginner_badge": ["Sing 25 improvised songs with clear melodies and stay in key throughout", "Demonstrate knowledge of 10 basic chord progressions and sing over them spontaneously", "Create rhyming lyrics on the spot for 20 songs in various topics without breaking rhythm"],
        "intermediate_badge": ["Perform songs improvised in 8 different genres (country, rap, opera, folk, etc.) with authentic style elements", "Lead 15 group songs where multiple people sing harmony and take turns with verses", "Create and sustain character voices through song in 10 different character improvisations"],
        "expert_badge": ["Compose and perform 5 complex musical narratives with multiple characters and plot developments", "Master 10 advanced musical structures (AABA, verse-bridge-chorus, etc.) in improvised performance"],
        "capstone_project": "Create and perform a full-length improvised musical with multiple acts."
    },
    {
        "name": "Dance",
        "beginner_badge": ["Count and move to music in 4/4, 3/4, and 6/8 time for 20 songs without losing the beat", "Learn and perform 15 fundamental steps in your chosen dance style with proper technique", "Dance continuously for 30 minutes while maintaining body awareness and spatial orientation"],
        "intermediate_badge": ["Learn and perform 10 choreographed combinations of 64+ counts each with accuracy and musicality", "Freestyle dance for 5 minutes expressing emotion and personal style to various musical genres", "Successfully partner dance or perform group choreography with 5+ people in sync"],
        "expert_badge": ["Create 5 original choreographed pieces of 3+ minutes each with clear structure and artistic vision", "Demonstrate proficiency in 4 different dance styles with authentic movement quality"],
        "capstone_project": "Choreograph and perform a 10-minute dance piece that tells a story."
    },
    {
        "name": "Ballet",
        "beginner_badge": ["Demonstrate the five basic positions of feet and arms with proper alignment and hold each for 30 seconds", "Complete 45 minutes of barre work including pliés, tendus, dégagés, and relevés with correct form", "Know and demonstrate 30 basic ballet terms with proper French pronunciation"],
        "intermediate_badge": ["Perform 10 center floor combinations including adagio, tendu, and grand battement sequences", "Execute 5 different jumps (échappé, assemblé, sissonne, etc.) and 3 turns (chainé, pirouette, etc.) with control", "Maintain proper alignment and technique through 60-minute ballet classes for 4 weeks"],
        "expert_badge": ["Master 15 advanced allegro combinations and 10 complex adagio sequences with artistry", "Dance en pointe for 30 minutes (if applicable) or master advanced allegro with exceptional height and control"],
        "capstone_project": "Perform a complete ballet variation or create an original ballet piece."
    },
    {
        "name": "Plant Identification",
        "beginner_badge": ["Correctly identify 25 common local plants by sight with 90%+ accuracy on repeated tests", "Name and point out 10 basic plant parts (pistil, stamen, sepals, etc.) on live specimens", "Successfully use 3 different field guides and 2 plant identification apps to verify plant identities"],
        "intermediate_badge": ["Identify 50 plants in different seasons (spring, summer, fall) including winter identification of 15 trees by bark and buds", "Learn scientific names for 100 plants and correctly identify 25 plant families by key characteristics", "Create detailed habitat maps showing where 30 different plant species grow in your area"],
        "expert_badge": ["Successfully identify 25 rare or difficult species and contribute 10 verified observations to citizen science databases", "Lead 5 nature walks for groups of 8+ people, teaching plant identification skills"],
        "capstone_project": "Create a comprehensive field guide for plants in your local area."
    },
    {
        "name": "Birding",
        "beginner_badge": ["Correctly identify 20 common local birds by sight with 90%+ accuracy using field marks", "Use binoculars effectively to spot and track birds at distances up to 100 yards", "Identify and name 15 basic bird anatomy parts (crown, nape, rump, etc.) on live birds"],
        "intermediate_badge": ["Identify 30 birds by song and call without visual confirmation", "Document 100 bird species during migration seasons with dates, locations, and behaviors", "Use field marks to distinguish between 20 pairs of similar species (Cooper's vs Sharp-shinned Hawk, etc.)"],
        "expert_badge": ["Successfully identify 10 rare or vagrant species and contribute verified sightings to eBird", "Complete 5 bird counts for citizen science projects (Christmas Bird Count, Breeding Bird Survey, etc.)"],
        "capstone_project": "Complete a Big Year challenge or lead birding tours in your area."
    },
    {
        "name": "Directing Theatre",
        "beginner_badge": ["Complete script analysis for 5 plays, identifying themes, character arcs, and dramatic structure", "Direct a 20-minute one-act play from auditions through performance", "Create blocking for 10 scenes showing clear stage pictures and motivated movement"],
        "intermediate_badge": ["Direct a full-length play through 6+ week rehearsal process with cast of 6+ actors", "Collaborate with designers to create unified vision including set, costume, lighting, and sound", "Lead 30+ rehearsals demonstrating clear communication and problem-solving skills"],
        "expert_badge": ["Develop and articulate a unique directorial vision evident in 3 completed productions", "Mentor 3 emerging directors through the process of directing their first shows"],
        "capstone_project": "Direct an original work or challenging classic with a full production team."
    },
    {
        "name": "Theatre Sound",
        "beginner_badge": ["Set up and operate 10 different pieces of audio equipment (mixers, speakers, mics, etc.) safely and correctly", "Mix live audio for 3 performances maintaining consistent levels and avoiding feedback", "Create 25 sound effects using recording and editing software"],
        "intermediate_badge": ["Design complete soundscapes for 3 theatrical productions with 50+ cues each", "Master live sound reinforcement for productions with 8+ wireless microphones", "Operate complex sound systems with multi-zone output and monitor sends"],
        "expert_badge": ["Create complex multi-channel designs using 16+ channels and surround sound positioning", "Program and operate QLab or professional software for 3 productions with 100+ cues"],
        "capstone_project": "Design and execute sound for a complex musical or multi-location show."
    },
    {
        "name": "Theatre Lighting",
        "beginner_badge": ["Identify and safely operate 15 different lighting instruments (ellipsoidals, fresnels, PARs, etc.)", "Create color palettes using 20+ gel colors and understand color theory in stage lighting", "Design and execute simple lighting plots with 40+ fixtures for 3 productions"],
        "intermediate_badge": ["Program and operate lighting consoles for 5 different types of productions (drama, comedy, dance, etc.)", "Design lighting with 100+ cues including complex timing and fades", "Master advanced lighting positions and understand photometrics for throw distances"],
        "expert_badge": ["Create complex moving light designs with 20+ automated fixtures and programming", "Master professional lighting software (Lightwright, Vectorworks, etc.) for design and documentation"],
        "capstone_project": "Design lighting for a large-scale production with complex technical requirements."
    },
    {
        "name": "Acting",
        "beginner_badge": ["Study and practice 3 different acting techniques (Stanislavski, Meisner, etc.) for 20 hours each", "Memorize and perform 10 monologues of 2+ minutes each with emotional depth and clarity", "Create detailed character backgrounds and motivations for 5 different roles"],
        "intermediate_badge": ["Study 5 different acting methods and demonstrate techniques from each in scene work", "Perform 20 two-person scenes showing genuine reaction and connection with scene partners", "Develop voice projection and movement skills through 40 hours of specialized training"],
        "expert_badge": ["Master period-specific speech and movement for 3 historical eras (Shakespearean, Victorian, etc.)", "Create and perform 5 completely original characters with unique physicality and vocal patterns"],
        "capstone_project": "Perform a one-person show or lead role in a challenging dramatic work."
    },
    {
        "name": "Theatre Acting",
        "beginner_badge": ["Project voice to fill a 200-seat theater without strain during 90-minute performances", "Master stage geography using all 9 stage areas and demonstrate motivated movement", "Perform in 5 ensemble pieces showing strong listening and reaction skills"],
        "intermediate_badge": ["Perform successfully in 4 different theatrical styles (classical, contemporary, comedy, drama)", "Complete 20 successful auditions demonstrating strong preparation and professionalism", "Take and incorporate direction from 5 different directors in rehearsal and performance"],
        "expert_badge": ["Lead 3 acting workshops teaching specific techniques to groups of 8+ students", "Perform leading roles in both classical (Shakespeare, Chekhov, etc.) and contemporary works in the same season"],
        "capstone_project": "Perform leading roles in both a classical work and contemporary play in the same season."
    },
    {
        "name": "Archery",
        "beginner_badge": ["Demonstrate proper stance, grip, and form consistently through 100 arrow practice sessions", "Achieve 6-inch groupings at 10 yards for 50 consecutive arrows", "Pass safety test and demonstrate knowledge of equipment maintenance for bow and arrows"],
        "intermediate_badge": ["Shoot accurately at 20, 30, 40, and 50 yards with 8-inch groupings or better", "Learn and demonstrate 3 different archery styles (recurve, compound, traditional)", "Tune bow and arrows to achieve consistent spine and achieve 300+ score in standard NFAA round"],
        "expert_badge": ["Compete in 5 tournaments and place in top 25% of your division", "Coach 5 beginning archers through their first 3 months of training with measurable improvement"],
        "capstone_project": "Achieve expert classification scores or compete in a national archery championship."
    },
    {
        "name": "Music Theory",
        "beginner_badge": ["Name all notes on treble and bass clef staffs and identify 12 intervals by sight and sound", "Write and identify all major and minor scales with correct key signatures", "Read and clap rhythms in 4/4, 3/4, 2/4, and 6/8 time signatures accurately"],
        "intermediate_badge": ["Analyze 20 songs identifying chord progressions, key centers, and harmonic function (I, IV, V, etc.)", "Compose 10 short pieces using different scales and modes (dorian, mixolydian, etc.)", "Identify and write 15 different chord types (major 7th, diminished, augmented, etc.) in all inversions"],
        "expert_badge": ["Compose 5 pieces using advanced harmonic concepts like secondary dominants and modulation", "Teach music theory concepts to 3 students and help them pass theory exams"],
        "capstone_project": "Compose a complex multi-movement work demonstrating advanced theoretical knowledge."
    },
    {
        "name": "Cello",
        "beginner_badge": ["Demonstrate proper bow hold and posture, maintaining form through 30-minute practice sessions", "Play 2-octave scales in 5 major keys with correct fingering and intonation", "Perform 10 simple melodies with clean string crossings and note accuracy"],
        "intermediate_badge": ["Master vibrato technique and shifting to 4th position with consistent intonation", "Play 10 intermediate pieces from method books (Suzuki Book 3-4 level or equivalent)", "Perform with piano accompaniment maintaining ensemble timing for 15-minute recital pieces"],
        "expert_badge": ["Master thumb position and advanced techniques like harmonics and sul ponticello", "Perform 5 challenging pieces from standard classical repertoire (Bach Suites, concerto movements, etc.)"],
        "capstone_project": "Perform a complete cello concerto with orchestra or advanced chamber music."
    },
    {
        "name": "Learning Electronics",
        "beginner_badge": ["Identify 20 basic electronic components and explain their functions (resistors, capacitors, LEDs, etc.)", "Build 10 simple circuits on breadboard including LED flashers, buzzers, and basic switches", "Use multimeter correctly to measure voltage, current, and resistance in 15 different circuits"],
        "intermediate_badge": ["Design and build 5 analog circuits from schematic (amplifiers, filters, oscillators)", "Program 3 microcontroller projects using Arduino or similar platform", "Build 10 digital logic circuits using AND, OR, NOT gates and understand truth tables"],
        "expert_badge": ["Design custom PCB layouts for 3 projects and have them professionally manufactured", "Troubleshoot and repair 10 complex electronic devices using systematic debugging approaches"],
        "capstone_project": "Design and build an original electronic device with custom PCB and enclosure."
    },
    {
        "name": "Guitar Pedal Making",
        "beginner_badge": ["Build 5 simple pedals (fuzz, overdrive, buffer) from verified schematics with clean solder joints", "Solder 100 connections with consistent, professional-quality joints", "Demonstrate understanding of guitar signal flow by tracing signal through 10 pedal circuits"],
        "intermediate_badge": ["Design 3 custom circuit modifications and successfully implement them in working pedals", "Build 10 different effect types (modulation, delay, reverb, etc.) with proper enclosure and controls", "Master enclosure design including proper drilling, labeling, and aesthetic finishing"],
        "expert_badge": ["Create 5 completely original circuit designs and document them with schematics", "Build complex multi-effect units with switching systems and multiple circuits in one enclosure"],
        "capstone_project": "Design and manufacture a signature pedal line for local musicians."
    },
    {
        "name": "Locksmithing",
        "beginner_badge": ["Disassemble and explain operation of 10 different lock mechanisms (pin tumbler, wafer, disc detainer)", "Pick 25 different pin tumbler locks of varying difficulty using proper technique", "Rekey 15 residential locks to new keys and verify proper operation"],
        "intermediate_badge": ["Master 5 different lock types including automotive, high-security, and electronic systems", "Install 20 different lock systems and perform maintenance on 30 existing locks", "Cut 100 keys by code and duplicate 100 keys with proper specifications"],
        "expert_badge": ["Work with 10 high-security systems (Medeco, ASSA, etc.) and demonstrate advanced techniques", "Complete safe and vault work including manipulation and repair of 5 different safe mechanisms"],
        "capstone_project": "Complete locksmith certification and establish a professional locksmith practice."
    },
    {
        "name": "Digital Security",
        "beginner_badge": ["Set up unique passwords and 2FA on 20 personal accounts and use password manager consistently", "Implement full-disk encryption on 3 devices and understand 5 encryption algorithms", "Secure 10 personal devices with proper settings, updates, and malware protection"],
        "intermediate_badge": ["Configure firewall rules and network security for home/small office with 15+ devices", "Complete 5 penetration testing exercises on practice systems (HackTheBox, TryHackMe, etc.)", "Create threat models for 3 different scenarios and implement appropriate security measures"],
        "expert_badge": ["Conduct comprehensive security audits of 3 small organizations and provide remediation plans", "Develop and implement security protocols for organization with 50+ users"],
        "capstone_project": "Design and implement a comprehensive security framework for a small organization."
    },
    {
        "name": "Network Security",
        "beginner_badge": ["Configure and secure 5 different network protocols (HTTP/HTTPS, FTP, SSH, etc.)", "Set up and configure firewall rules for 3 different network topologies", "Monitor network traffic using Wireshark and identify 10 types of suspicious activity"],
        "intermediate_badge": ["Deploy and configure intrusion detection systems (Snort, Suricata) on 3 networks", "Conduct vulnerability assessments on 10 different systems and networks", "Perform network forensics on 5 security incidents and create detailed reports"],
        "expert_badge": ["Design secure network architectures for 3 organizations with different security requirements", "Lead incident response for 5 network security breaches including containment and remediation"],
        "capstone_project": "Architect and implement a zero-trust network security system."
    },
    {
        "name": "Piano",
        "beginner_badge": ["Maintain proper hand position and posture during 45-minute practice sessions without strain", "Play all major scales with correct fingering at 120 BPM and 5 simple pieces with both hands", "Read music notation fluently for simple pieces up to 2 sharps/flats"],
        "intermediate_badge": ["Play chord progressions (I-IV-V-I) in all 12 keys and arpeggios with smooth technique", "Perform 10 pieces from classical and popular repertoire spanning different musical periods", "Use pedaling effectively in 5 pieces demonstrating legato and harmonic pedaling techniques"],
        "expert_badge": ["Perform 3 advanced classical works (Chopin etudes, Bach inventions, etc.) with technical proficiency", "Improvise fluently in 5 different styles and compose 3 original pieces"],
        "capstone_project": "Perform a full solo recital including works from multiple musical periods."
    },
    {
        "name": "Songwriting",
        "beginner_badge": ["Write 15 complete songs with verse-chorus structure including melody and lyrics", "Use 10 different chord progressions and demonstrate understanding of I-IV-V-I harmony", "Create songs in 5 different structures (ABABCB, AABA, etc.) with clear sections"],
        "intermediate_badge": ["Write 20 songs with compelling lyrics that tell stories or convey specific emotions", "Compose in 6 different genres (folk, rock, jazz, country, etc.) with authentic style elements", "Co-write 10 songs with other musicians demonstrating collaboration skills"],
        "expert_badge": ["Arrange 5 songs for different instrumentation (solo, band, orchestra) with detailed charts", "Develop a unique songwriting voice recognizable across 15 original compositions"],
        "capstone_project": "Write and produce a complete album of original songs with professional quality."
    },
    {
        "name": "Writing",
        "beginner_badge": ["Write 500+ words daily for 30 consecutive days without missing a day", "Complete 10 short stories of 2000+ words each and 20 articles of 1000+ words", "Demonstrate grammar and style mastery by editing 25 pieces to professional standards"],
        "intermediate_badge": ["Write 50 pieces in your unique voice that others can identify as your work", "Master 5 different writing genres (fiction, non-fiction, poetry, journalism, technical)", "Give constructive feedback on 30 other writers' works and receive feedback on 30 of your own"],
        "expert_badge": ["Complete 3 long-form works: novel (60,000+ words), memoir, or major non-fiction book", "Publish 10 pieces in magazines, websites, or other venues and market your writing effectively"],
        "capstone_project": "Write and publish a novel, collection, or major non-fiction work."
    },
    {
        "name": "Language Learning",
        "beginner_badge": ["Learn 500 essential vocabulary words and use them correctly in sentences", "Master pronunciation fundamentals with 90%+ accuracy as verified by native speakers", "Hold 20 conversations of 10+ minutes each on basic topics (family, hobbies, daily routine)"],
        "intermediate_badge": ["Read 10 simple books or 50 articles in target language with 80%+ comprehension", "Watch 20 movies with subtitles in target language and discuss plots and characters", "Write 25 essays of 500+ words each on various topics with correct grammar"],
        "expert_badge": ["Maintain conversational fluency in 2-hour discussions on complex topics", "Read advanced literature (novels, poetry, news) with 95%+ comprehension"],
        "capstone_project": "Spend a month in a country speaking only the target language."
    },
    {
        "name": "Chess",
        "beginner_badge": ["Demonstrate knowledge of all piece movements, special rules (castling, en passant), and basic checkmate patterns", "Win 75% of games against beginners using basic tactical patterns (forks, pins, skewers)", "Play 50 complete games with time controls, recording moves in algebraic notation"],
        "intermediate_badge": ["Study and apply 10 opening principles and know 5 complete opening systems to move 10", "Solve 500 tactical puzzles and demonstrate mastery of 20 endgame positions", "Analyze 25 master games and identify key strategic and tactical moments"],
        "expert_badge": ["Achieve USCF rating of 1600+ or equivalent online rating through tournament play", "Teach chess to 5 beginners and help them reach basic competency"],
        "capstone_project": "Compete in a state or national chess championship."
    },
    {
        "name": "Pottery",
        "beginner_badge": ["Master 5 hand-building techniques (pinch, coil, slab, etc.) and complete 15 hand-built pieces", "Throw 25 simple bowls on the wheel with consistent wall thickness and centered forms", "Prepare 100 pounds of clay from dry state including wedging and proper consistency"],
        "intermediate_badge": ["Apply 20 different glaze techniques and achieve intended results on 50 fired pieces", "Create complete functional pottery sets for 4 people (plates, bowls, cups, serving pieces)", "Successfully complete 30 firings understanding kiln operation and temperature control"],
        "expert_badge": ["Develop 3 signature glaze recipes and decorative techniques recognizable as your style", "Master 5 advanced techniques (crystalline glazes, raku, wood firing, etc.)"],
        "capstone_project": "Create and fire a complete dinnerware set for 8 people."
    },
    {
        "name": "Knitting",
        "beginner_badge": ["Demonstrate consistent knit and purl stitches with even tension through 20 practice swatches", "Complete 10 simple projects: 5 scarves and 5 dishcloths with clean edges", "Successfully follow 15 different written patterns without assistance"],
        "intermediate_badge": ["Master 10 techniques: increases, decreases, cables, colorwork, and shaping methods", "Knit 5 sweaters in different styles (pullover, cardigan, etc.) with proper fit", "Design 3 simple patterns and have others successfully knit them"],
        "expert_badge": ["Create 10 pieces with intricate colorwork (Fair Isle, intarsia) and complex cable patterns", "Design 5 original complex patterns with detailed written instructions and charts"],
        "capstone_project": "Design and knit an original sweater with complex colorwork or cable patterns."
    },
    {
        "name": "Blacksmithing",
        "beginner_badge": ["Pass forge safety exam and demonstrate safe operation of forge, anvil, and 15 basic tools", "Forge 25 simple items: hooks, nails, square stock exercises with consistent technique", "Heat and cool 50 pieces of steel demonstrating control of temperature and color recognition"],
        "intermediate_badge": ["Create 15 functional tools and hardware pieces (chisels, tongs, door handles) with proper heat treatment", "Master 8 joining techniques including forge welding, riveting, and collaring", "Work successfully with 5 different metals (mild steel, carbon steel, wrought iron, etc.)"],
        "expert_badge": ["Forge 5 complex sculptural pieces demonstrating artistic vision and advanced techniques", "Master 3 advanced techniques: create Damascus steel, cast iron work, or pattern welding"],
        "capstone_project": "Forge a complete set of kitchen knives or artistic sculpture."
    },
    {
        "name": "Rock Climbing",
        "beginner_badge": ["Pass climbing safety course and demonstrate proper equipment use (harness, helmet, shoes)", "Climb 25 routes rated 5.6-5.8 consistently without falling", "Master belay techniques for top-rope climbing and pass belay certification"],
        "intermediate_badge": ["Climb 20 routes rated 5.9-5.11 demonstrating improved technique and strength", "Learn lead climbing and successfully lead 15 sport routes with clean falls", "Master 5 climbing styles: sport, trad, bouldering, crack climbing, face climbing"],
        "expert_badge": ["Climb 10 routes rated 5.12+ demonstrating advanced technique and mental control", "Set 20 boulder problems and 15 rope routes for others with appropriate safety standards"],
        "capstone_project": "Complete a multi-pitch traditional climbing route or establish new routes."
    },
    {
        "name": "Swimming",
        "beginner_badge": ["Swim 100 yards each in freestyle, backstroke, breaststroke, and butterfly with proper technique", "Swim 500 yards continuously without stopping using any stroke combination", "Demonstrate 5 water safety skills including treading water for 10 minutes"],
        "intermediate_badge": ["Develop efficient technique reducing stroke count by 25% while maintaining speed", "Master racing starts, turns, and flip turns for all four competitive strokes", "Swim 1 mile continuously in under 40 minutes"],
        "expert_badge": ["Master competitive swimming techniques and achieve state/regional qualifying times", "Coach 5 swimmers to improve their technique and times by 20%"],
        "capstone_project": "Complete an open water swim event or swimming competition."
    },
    {
        "name": "Martial Arts",
        "beginner_badge": ["Master 10 basic stances and hold each correctly for 2 minutes with proper alignment", "Demonstrate 25 fundamental techniques (strikes, blocks, kicks) with correct form", "Study and explain 10 core principles of your chosen martial art philosophy"],
        "intermediate_badge": ["Learn and perform 5 forms/katas with precision and power", "Practice controlled sparring for 50 sessions demonstrating safety and technique", "Advance through 3 belt ranks with testing requirements met"],
        "expert_badge": ["Master 10 advanced techniques and demonstrate ability to adapt them in live application", "Teach 15 classes to junior students and mentor 3 students to their next belt rank"],
        "capstone_project": "Achieve black belt rank or compete in martial arts tournaments."
    },
    {
        "name": "Astronomy",
        "beginner_badge": ["Identify 25 major constellations and 50 bright stars visible from your location", "Set up and operate telescope or binoculars to observe 20 celestial objects (planets, nebulae, clusters)", "Explain orbital mechanics, phases of moon, and predict 10 astronomical events"],
        "intermediate_badge": ["Master astrophotography basics and capture 50 quality images of celestial objects", "Track and photograph 15 celestial events (eclipses, meteor showers, conjunctions) with accurate timing", "Use star charts, apps, and coordinates to locate 100 deep-sky objects"],
        "expert_badge": ["Contribute 25 observations to citizen science projects (variable star monitoring, asteroid tracking)", "Mentor 5 beginning astronomers and lead 10 star parties for public education"],
        "capstone_project": "Discover or photograph a deep-sky object or contribute to astronomical research."
    },
    {
        "name": "3D Printing",
        "beginner_badge": ["Set up and calibrate 3D printer including bed leveling, nozzle height, and extrusion settings", "Successfully print 25 objects with 90%+ success rate and clean layer adhesion", "Master slicing software settings for 5 different materials (PLA, ABS, PETG, etc.)"],
        "intermediate_badge": ["Design 15 original 3D models using CAD software with proper dimensions and tolerances", "Print successfully with 10 different materials understanding temperature and print settings", "Diagnose and fix 20 different printing problems (warping, stringing, layer shifting, etc.)"],
        "expert_badge": ["Create 5 complex multi-part assemblies with moving parts that fit together perfectly", "Modify and upgrade 3 different printer hardware systems improving performance"],
        "capstone_project": "Design and print a functional mechanical device with moving parts."
    },
    {
        "name": "Leatherworking",
        "beginner_badge": ["Master 5 basic cutting techniques and hand-stitch 20 projects with consistent, straight stitches", "Create 15 simple items: wallets, belts, keychains with clean edges and proper finishing", "Identify and work with 8 different leather types understanding their properties and uses"],
        "intermediate_badge": ["Master tooling and carving techniques creating 10 decorated pieces with intricate patterns", "Create 10 bags and cases with proper construction and hardware installation", "Learn and apply 8 dyeing techniques achieving consistent, professional coloring"],
        "expert_badge": ["Create 5 complex shaped items (holsters, shoes, armor) requiring advanced pattern-making", "Master 5 advanced decorative techniques including embossing, pyrography, and inlay work"],
        "capstone_project": "Create a leather briefcase or saddle with intricate toolwork."
    },
    {
        "name": "Beekeeping",
        "beginner_badge": ["Study bee anatomy, lifecycle, and behavior; pass written exam with 90%+ score", "Set up and maintain 2 hives for full season with proper equipment and safety protocols", "Harvest 50+ pounds of honey using proper extraction techniques"],
        "intermediate_badge": ["Manage 5 hives through all seasons identifying and treating 3 common diseases/pests", "Understand seasonal management performing 20 hive inspections with detailed record keeping", "Successfully breed 3 queen bees and manage hive splits"],
        "expert_badge": ["Manage 20+ hive commercial operation with consistent honey production", "Conduct bee research contributing to understanding of bee genetics, behavior, or health"],
        "capstone_project": "Establish a honey business or contribute to bee conservation research."
    },
    {
        "name": "Bread Baking",
        "beginner_badge": ["Master kneading, proofing, and shaping techniques for 10 basic bread recipes", "Bake 50 loaves with consistent results achieving proper crust, crumb, and flavor", "Understand fermentation science and control temperature, timing, and hydration"],
        "intermediate_badge": ["Create and maintain sourdough starter for 3 months with consistent activity", "Master 15 different bread styles (baguettes, challah, focaccia, etc.) with authentic techniques", "Perfect timing and temperature control baking 25 loaves with 95% success rate"],
        "expert_badge": ["Develop 5 signature bread recipes and document formulas for consistent reproduction", "Master 5 artisan techniques (lamination, pre-ferments, wood-fired ovens, etc.)"],
        "capstone_project": "Open a bakery or win a bread-making competition."
    },
    {
        "name": "Brewing",
        "beginner_badge": ["Brew 10 extract-based beer recipes with consistent results and proper flavor profiles", "Master fermentation process achieving target gravity readings and fermentation times", "Implement rigorous sanitation protocol with zero contaminated batches in 15 brews"],
        "intermediate_badge": ["Transition to all-grain brewing mastering mashing, sparging, and conversion efficiency", "Develop 8 original recipes using recipe formulation software and ingredient calculations", "Control fermentation variables (temperature, pH, yeast health) achieving specific flavor profiles"],
        "expert_badge": ["Create 5 award-winning recipes and place in top 3 at brewing competitions", "Master 5 advanced techniques (barrel aging, wild fermentation, water chemistry, etc.)"],
        "capstone_project": "Win a brewing competition or open a commercial brewery."
    },
    {
        "name": "Jewelry Making",
        "beginner_badge": ["Master wire wrapping techniques creating 25 pendants and earrings with clean, consistent loops", "Create 20 simple jewelry pieces using basic tools (pliers, cutters, files) with professional finish", "Master 10 basic tools and demonstrate proper use and maintenance"],
        "intermediate_badge": ["Learn soldering and metalwork creating 15 pieces with clean joints and proper heat control", "Set 20 stones in various settings (prong, bezel, channel) with secure, professional mounting", "Design 10 complex pieces showing understanding of proportion, balance, and wearability"],
        "expert_badge": ["Master 3 advanced techniques (casting, engraving, granulation) and create 10 pieces each", "Create 5 museum-quality pieces demonstrating exceptional craftsmanship and artistic vision"],
        "capstone_project": "Create a complete jewelry collection or commission piece worth $1000+."
    },
    {
        "name": "Calligraphy",
        "beginner_badge": ["Master letterforms in 3 basic alphabets (Italic, Foundational, Gothic) with consistent height and spacing", "Demonstrate proper pen technique maintaining 45-degree angle and consistent pressure", "Create 25 simple quotes and greeting cards with balanced layout and clean execution"],
        "intermediate_badge": ["Study and practice 5 historical scripts (Uncial, Copperplate, etc.) with authentic characteristics", "Master layout and composition creating 20 pieces with proper margins and visual hierarchy", "Work with various materials (parchment, vellum, different inks) achieving consistent results"],
        "expert_badge": ["Develop recognizable personal style evident in 30 completed pieces", "Create 3 illuminated manuscripts with gold leaf and miniature paintings"],
        "capstone_project": "Create a hand-lettered book or large commissioned calligraphy work."
    },
    {
        "name": "Magic",
        "beginner_badge": ["Master 5 basic sleight of hand techniques (palming, false transfers, etc.) performing them smoothly 95% of the time", "Learn and perform 10 card tricks flawlessly including 3 self-working and 7 requiring skill", "Perform successfully for 25 different audiences (family, friends, strangers) with positive reactions"],
        "intermediate_badge": ["Develop confident stage presence performing 15-minute shows without breaking character", "Master 20 coin and close-up magic tricks with smooth, invisible method", "Create 5 original magic routines with personalized patter and presentation"],
        "expert_badge": ["Perform professionally at 10 paid events with satisfied clients and referrals", "Mentor 3 beginning magicians helping them develop their first 10 tricks"],
        "capstone_project": "Perform a full magic show or compete in magic competitions."
    },
];