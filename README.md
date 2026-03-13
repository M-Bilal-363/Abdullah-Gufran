# 🎬 Netflix Top Shows & Movies — Beginner Data Science Project

A beginner-friendly, step-by-step data science project built around a Netflix dataset covering top TV shows and movies (up to 2023), including IMDb scores, genres, countries, age ratings, and more.

---

## 👋 New Here? Start With This!

> **Not sure where to begin?** Read the complete beginner setup guide first:
>
> **➡️ [GETTING_STARTED.md](./GETTING_STARTED.md) — Step-by-step: install Python, set up your editor, and run your first analysis in ~15 minutes**

---

## 📂 Project Files

| File | Description |
|------|-------------|
| `GETTING_STARTED.md` | **Start here** — step-by-step setup guide for absolute beginners |
| `netflix_top_shows_2023.csv` | Raw dataset — 100 Netflix titles with 14 columns |
| `netflix_analysis.ipynb` | Jupyter notebook with full step-by-step analysis |
| `requirements.txt` | Python dependencies |

---

## 📊 Dataset Columns

| Column | Description |
|--------|-------------|
| `show_id` | Unique identifier |
| `title` | Name of the show or movie |
| `type` | TV Show or Movie |
| `director` | Director(s) |
| `cast` | Main actors |
| `country` | Country of production |
| `date_added` | Date added to Netflix |
| `release_year` | Original release year |
| `rating` | Age/content rating (TV-MA, PG-13, R, etc.) |
| `duration` | Runtime (minutes for movies, seasons for TV shows) |
| `genre` | Genre(s) |
| `imdb_score` | IMDb user rating out of 10 |
| `votes` | Number of IMDb votes |
| `description` | Short plot summary |

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Launch Jupyter Notebook
```bash
jupyter notebook netflix_analysis.ipynb
```

---

## 📖 What You Will Learn

The notebook walks through every stage of a real data science workflow:

1. **Setup** — importing pandas, numpy, matplotlib and seaborn  
2. **Loading data** — reading a CSV file into a DataFrame  
3. **Exploring data** — shapes, types, missing values, summary statistics  
4. **Cleaning data** — handling NaNs, converting dates, extracting numbers from text  
5. **Exploratory Data Analysis (EDA)** — answering questions with code  
6. **Visualizations** — pie charts, histograms, bar charts, box plots, scatter plots  
7. **Insights** — summarising findings  
8. **Practice exercises** — challenges to test your new skills  

---

## 🛠️ Technologies Used

- **Python 3.10+**
- **pandas** — data manipulation
- **numpy** — numerical computing
- **matplotlib** — charting
- **seaborn** — statistical visualizations
- **Jupyter Notebook** — interactive coding environment

---

## 📌 Sample Insights

- 📺 TV Shows score higher on average than Movies on IMDb
- 🌍 The United States produces the most Netflix content
- 🔞 TV-MA is the most common age rating
- ⏱️ Average movie runtime is approximately 118 minutes
- 🏆 Nature documentaries (*Our Planet*, *Queer Eye*) consistently top the ratings

---

## 💡 Next Steps After This Project

- Add more titles to expand the dataset
- Train a machine learning model to predict IMDb scores
- Build an interactive dashboard with Plotly or Streamlit
- Explore the official [Netflix Prize dataset](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data) on Kaggle