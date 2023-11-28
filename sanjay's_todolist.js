let events = [];

function addEvent() {
    const eventInput = document.getElementById("eventInput").value;
    const prioritySelect = document.getElementById("prioritySelect").value;

    if (eventInput && prioritySelect) {
        const newEvent = {
            event: eventInput,
            priority: prioritySelect,
            status: "ongoing"
        };

        events.push(newEvent);
        updateEventList();
        updateCounts();
    } else {
        alert("Provide Complete Info");
    }
}

function updateEventList() {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    events.forEach((event, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${event.event} - ${event.priority}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteEvent(index);

        listItem.appendChild(deleteButton);
        eventList.appendChild(listItem);
    });
}

function deleteEvent(index) {
    events[index].status = "completed";
    updateEventList();
    updateCounts();
}

function filterEvents() {
    const filterSelect = document.getElementById("filterSelect").value;

    if (filterSelect === "recently") {
        events.sort((a, b) => b.timestamp - a.timestamp);
    } else if (filterSelect === "priority") {
        events.sort((a, b) => {
            const priorityOrder = {
                more: 0,
                medium: 1,
                less: 2
            };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    } else if (filterSelect === "ongoing") {
        events = events.filter(event => event.status === "ongoing");
    } else if (filterSelect === "completed") {
        events = events.filter(event => event.status === "completed");
    }

    updateEventList();
}

function updateCounts() {
    const counts = document.getElementById("counts");
    const ongoingCount = events.filter(event => event.status === "ongoing").length;
    const completedCount = events.filter(event => event.status === "completed").length;
    const totalCount = events.length;
    const completionPercentage = ((completedCount / totalCount) * 100).toFixed(2);

    counts.innerHTML = `
        Ongoing: ${ongoingCount} | Completed: ${completedCount} | Total: ${totalCount} | Completion: ${completionPercentage}%
    `;
}