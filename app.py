 from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
import io

app = Flask(__name__)

# Mock function to simulate blood group detection from fingerprint image
def simulate_blood_group_detection(image):
    # Convert the image to a NumPy array (preprocessing step for your model)
    image_array = np.array(image)
    
    # Your model prediction logic would go here. For example:
    # blood_group = model.predict(image_array)
    
    # Here we'll return a fixed prediction for demonstration
    blood_groups = ['A+', 'B+', 'O+', 'A-', 'B-', 'O-', 'AB+', 'AB-']
    
    # In real-life, you would use the model to predict the blood group based on the image
    # For example, the model might output one of the blood group values.
    return np.random.choice(blood_groups)

# Serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')  # Renders the HTML file located in the templates folder

# Blood group prediction endpoint
@app.route('/predict-blood-group', methods=['POST'])
def predict_blood_group():
    if 'fingerprint' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['fingerprint']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Open the image using Pillow
        image = Image.open(file.stream)

        # Optionally preprocess the image (e.g., resize, convert to grayscale)
        image = image.convert("RGB")  # Example conversion to RGB (can be adjusted based on your model)
        image = image.resize((224, 224))  # Example resize to match model input size
        
        # Now, we call the blood group detection function (you can replace it with your model's prediction)
        blood_group = simulate_blood_group_detection(image)

        # Return the predicted blood group as a JSON response
        return jsonify({'blood_group': blood_group})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
