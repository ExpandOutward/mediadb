# Testing Guide

**INTERNAL ONLY**

**Note:** For Postman testing, ensure that you have access to and have selected the appropriate Admin Environment to run the full testing collection.

**Last Test Run**: June 20th, 2026

**Bug Report**
| Bug       | Description                  | Action     |
|---------------|------------------------------|------------|
| IDs incorrect | IDs count up based on deleted objects      | Save this for a simulated trouble ticket

## UI Testing

### Authentication

| Action    | Result           |
|--------------|-------------------|
| Login  | Pass    |
| Change Password   | Pass     |
| Log Out  | Pass     |

#### Additional Details
All Authentication testing successful.

---

### Content

#### Load
| Action    | Result           |
|--------------|-------------------|
| Existing Data Loads  | Pass    |

#### Additional Details
Content successfully loaded from previous session.

---

#### Add Content Pass 1 (Before Update / Delete)


| Action    | Result           |
|--------------|-------------------|
| Add a movie  | Pass    |
| Add a game   | Pass     |
| Add a show  | Pass     |


#### Additional Details
Content successfully added.

---


#### Edit Content
| Action    | Result           |
|--------------|-------------------|
| Edit a movie  | Pass    |
| Edit a game   | Pass     |
| Edit a show  | Pass     |

#### Additional Details
Content successfully edited. 

---

#### Delete Content
| Action    | Result           |
|--------------|-------------------|
| Delete a movie  | Pass    |
| Delete a game   | Pass     |
| Delete a show  | Pass     |

#### Additional Details
Content successfully deleted.

---

#### Add Content Pass 1 (Before Update / Delete)


| Action    | Result           |
|--------------|-------------------|
| Add a movie  | Fail    |
| Add a game   | Fail     |
| Add a show  | Fail     |


#### Additional Details
When content is deleted, the ID of the deleted content causes the next created object to increment from that value. (Delete ID 1, create new object, ID is 2... should be 1). 

---

## Postman Testing

### Performance Testing

| Rule    | Result           |
|--------------|-------------------|
| Status code is 200 or 201 | Pass - All    |
| Response is less than 3000 ms   | Pass - All     |

#### Additional Details
All performance testing passed

---

### Functional Testing (Pass 1)

| API Request    | Result           |
|--------------|-------------------|
| Create User |  Pass  |
| Log In   |   Pass  |
|  Get Current Login  |  Pass   |
|  Change Password  |  Pass   |
|  Get Movies  |  Pass   |
|  Create Movie  |  Fail   |
|  Update Movie  |  Pass  |
|  Delete Movie  |  Pass   |
|  Get Games  |  Pass   |
|  Create Games  | Pass    |
|  Update Games  |  Pass    |
|  Delete Games  |  Pass   |
|  Get Shows  |  Pass   |
|  Create Show  |  Pass   |
|  Update Show  |  Pass   |
|  Delete Show  |  Pass   |
|  Log Out  |  Pass   |

#### Additional Details
All pass except the Create reqeusts. This issue has already been called out during manual testing. Add that the ID counts up regardless of the user.
- Create Games passed because it is the first game to be created. Will dive into this further during customer support simulation.

---

### Functional Testing (Pass 2)

| API Request    | Result           |
|--------------|-------------------|
| Create User |  N/A  |
| Log In   |   N/A  |
|  Get Current Login  |  N/A   |
|  Change Password  |  N/A   |
|  Get Movies  |  N/A   |
|  Get Movie  |  N/A   |
|  Create Movie  |  N/A   |
|  Update Movie  |  N/A  |
|  Delete Movie  |  N/A   |
|  Get Games  |  N/A   |
|  Get Game  |   N/A  |
|  Create Games  | N/A    |
|  Update Games  |   N/A  |
|  Delete Games  |  N/A   |
|  Get Shows  |  N/A   |
|  Get Show  |  N/A   |
|  Create Show  |  N/A   |
|  Update Show  |  N/A   |
|  Delete Show  |   N/A  |
|  Log Out  |  N/A   |

#### Additional Details
Second test will return same results. I should address the ID issue and rerun tests after the fix. 