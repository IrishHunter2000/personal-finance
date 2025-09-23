from flask import Flask, render_template_string, request

app = Flask(__name__)

# Basic HTML template for the dashboard
dashboard_html = """
<!doctype html>
<title>Investment Dashboard</title>
<h1>Investment Projection</h1>
<form method="post">
    Amount to invest: <input type="number" name="amount" required><br><br>
    Expected return (%): <input type="number" name="return_rate" required><br><br>
    Timeline (years): <input type="number" name="timeline" required><br><br>
    <input type="submit" value="Calculate">
</form>

{% if future_value %}
<h2>Projected Value: ${{ future_value }}</h2>
{% endif %}
"""

@app.route("/", methods=["GET", "POST"])
def investment_dashboard():
    future_value = None
    if request.method == "POST":
        try:
            amount = float(request.form.get("amount"))
            return_rate = float(request.form.get("return_rate")) / 100
            timeline = int(request.form.get("timeline"))
            
            # Simple future value calculation
            future_value = amount * (1 + return_rate) ** timeline
            future_value = round(future_value, 2)
            
        except (ValueError, TypeError):
            # Handle invalid input
            pass

    return render_template_string(dashboard_html, future_value=future_value)

if __name__ == "__main__":
    app.run(debug=True)
