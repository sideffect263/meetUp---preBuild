import sqlite3


# testing users
conn = sqlite3.connect('users.db')
c = conn.cursor()

# Execute a query to fetch all usernames and passwords
c.execute('SELECT username, password FROM users')

# Fetch all results
users_data = c.fetchall()

# Print the usernames and hashed passwords
for username, password_hashed in users_data:
    print(f"Username: {username}, Hashed Password: {password_hashed}")

# Close the database connection

# testing events
# write a query to fetch all events
conn = sqlite3.connect('events.db')
c = conn.cursor()
c.execute('SELECT * FROM events')
events_data = c.fetchall()
for event in events_data:
    print(event)
