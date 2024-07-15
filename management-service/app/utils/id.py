from datetime import datetime
import random


def generate_id() -> int:
    # Generate two random numbers between 0 and 99
    random_numbers = [random.randint(0, 99) for _ in range(2)]

    # Get the current minute and second
    now = datetime.now()
    current_minute = now.minute
    current_second = now.second

    # Combine all components into a formatted string
    generated_id = int(f"{random_numbers[0]:02}{current_minute:02}{current_second:02}")

    return generated_id
