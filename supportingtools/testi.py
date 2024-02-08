import numpy as np
import cv2

img = cv2.imread("path/to/image/file", cv2.IMREAD_GRAYSCALE)
img //= 255
img_list = img.tolist()

result = ""
for row in img_list:
    row_str = [str(p) for p in row]
    result += ", ".join(row_str)

output_file_path = "path/to/output/file/txt"
with open(output_file_path, "w") as file:
    file.write(result)

print("Result saved to:", output_file_path)
