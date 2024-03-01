def process_file(input_file_path, output_file_path):
    try:
        with open(input_file_path, 'r') as input_file:
            content = input_file.read()
        
        result_array = [0 if char == '.' else 1 for char in content if char != '\n']

        print(len(result_array))

        with open(output_file_path, 'w') as output_file:
            output_file.write(','.join(map(str, result_array)))
        
        print(f"Processing completed. Result written to {output_file_path}")

    except FileNotFoundError:
        print(f"Error: File not found - {input_file_path}")
    except Exception as e:
        print(f"Error: {e}")

input_file_path = 'input.map'
output_file_path = 'output.txt'

process_file(input_file_path, output_file_path)
