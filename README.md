# 🛒 Retail Shop Sales Prediction Model

A beginner-friendly, step-by-step machine learning project for predicting retail shop sales using Google Colab.

---

## 📁 Files

| File | Description |
|---|---|
| `retail_shop_dataset.csv` | Retail shop transactions dataset (1,000 rows) |
| `Retail_Shop_Prediction_Model.ipynb` | Google Colab notebook — step-by-step guide |

---

## 📊 Dataset Overview

The dataset contains **1,000 retail transactions** with the following columns:

| Column | Description |
|---|---|
| `Transaction_ID` | Unique ID for each sale |
| `Date` | Date of the transaction |
| `Day_of_Week` | Day name (Monday–Sunday) |
| `Month` | Month number (1–12) |
| `Is_Weekend` | 1 = weekend, 0 = weekday |
| `Store` | Store name (A, B, C, D) |
| `Category` | Product category (Electronics, Clothing, Groceries, etc.) |
| `Unit_Price` | Price of one item (₹) |
| `Units_Sold` | Number of items sold |
| `Discount_Percent` | Discount applied (%) |
| `Discount_Amount` | Total discount in ₹ |
| `Total_Sales` | **Total revenue — this is what we predict!** |
| `Customer_Age` | Age of the customer |
| `Customer_Gender` | Male / Female |
| `Payment_Method` | Cash, Credit Card, Debit Card, UPI |
| `Customer_Rating` | Customer rating (1.0–5.0) |

---

## 🚀 How to Run (Google Colab)

1. Go to [Google Colab](https://colab.research.google.com/)
2. Click **File → Upload notebook** and select `Retail_Shop_Prediction_Model.ipynb`
3. Upload `retail_shop_dataset.csv` when prompted in Step 0 of the notebook
4. Run cells one by one using **Shift + Enter**

---

## 📚 What You'll Learn

- Loading and exploring data with **pandas**
- Visualizing data with **matplotlib** and **seaborn**
- Preprocessing: encoding categories, scaling features, train/test split
- Building a **Linear Regression** model
- Building a **Random Forest** model
- Evaluating models with MAE, RMSE, and R² score
- Making predictions on new data
- Saving and loading trained models

---

## 🛠️ Libraries Used

- `pandas`, `numpy` — data handling
- `matplotlib`, `seaborn` — visualization
- `scikit-learn` — machine learning
- `joblib` — model saving

> All libraries are **pre-installed** in Google Colab — no setup needed!