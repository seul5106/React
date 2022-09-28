const people = [
    [50, "male", 25, "female"],
    [21, "female", 21, "female"],
    [25, "female", 32, "male"],
    [45, "female", 25, "female"],
    [52, "female", 25, "male"],
    [35, "male", 25, "male"]
]


for (let i = 0; i < 6; i++) {
    if (people[i][0] == people[i][2]) {
        console.log("동무");
    }

    if ((people[i][1] == "male") && (people[i][3] == "male")) {
        if ((people[i][0] < people[i][2])) {
            console.log("형");
        }
    }

    if ((people[i][1] == "male") && (people[i][3] == "male") || (people[i][1] == "female") && (people[i][3] == "male")) {
        if ((people[i][0] > people[i][2])) {
            console.log("남동생");
        }
    }

    if (people[i][1] == "male" && people[i][3] == "female") {
        if ((people[i][0] < people[i][2])) {
            console.log("누나");
        }
    }

    if (people[i][1] == "male" && people[i][3] == "female" || people[i][1] == "female" && people[i][3] == "female") {
        if ((people[i][0] > people[i][2])) {
            console.log("여동생");
        }
    }

    if (people[i][1] == "female" && people[i][3] == "male") {
        if ((people[i][0] < people[i][2])) {
            console.log("오빠");
        }
    }

    if ((people[i][1] == "female") && (people[i][3] == "female")) {
        if ((people[i][0] < people[i][2])) {
            console.log("언니");
        }
    }
    
}
