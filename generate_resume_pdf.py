"""
Generates assets/resume/resume.pdf — a clean, ATS-friendly, single-column
PDF resume matching the content of resume.html.

Re-run this script any time you update your resume content: edit the
data below, then run `python3 generate_resume_pdf.py`.
Requires: pip install reportlab
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem
)

INK = colors.HexColor("#14181D")
INK_SOFT = colors.HexColor("#55606A")
ACCENT = colors.HexColor("#B5790A")
BORDER = colors.HexColor("#DCE3E8")

styles = getSampleStyleSheet()

name_style = ParagraphStyle("Name", parent=styles["Title"], fontName="Helvetica-Bold",
                             fontSize=22, textColor=INK, alignment=TA_LEFT, spaceAfter=2)
role_style = ParagraphStyle("Role", parent=styles["Normal"], fontName="Helvetica-Bold",
                             fontSize=10.5, textColor=ACCENT, spaceAfter=4)
contact_style = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica",
                                fontSize=9, textColor=INK_SOFT, spaceAfter=10)
section_style = ParagraphStyle("Section", parent=styles["Normal"], fontName="Helvetica-Bold",
                                fontSize=10, textColor=ACCENT, spaceBefore=14, spaceAfter=6,
                                letterSpacing=1)
body_style = ParagraphStyle("Body", parent=styles["Normal"], fontName="Times-Roman",
                             fontSize=10.3, textColor=INK, leading=14.5)
entry_title_style = ParagraphStyle("EntryTitle", parent=styles["Normal"], fontName="Times-Bold",
                                    fontSize=10.6, textColor=INK, spaceAfter=1)
entry_meta_style = ParagraphStyle("EntryMeta", parent=styles["Normal"], fontName="Helvetica-Oblique",
                                   fontSize=8.7, textColor=INK_SOFT, spaceAfter=3)
bullet_style = ParagraphStyle("Bullet", parent=styles["Normal"], fontName="Times-Roman",
                               fontSize=10, textColor=INK, leading=13.5)

doc = SimpleDocTemplate(
    "assets/resume/resume.pdf",
    pagesize=letter,
    topMargin=0.65 * inch, bottomMargin=0.65 * inch,
    leftMargin=0.75 * inch, rightMargin=0.75 * inch,
    title="Khushi Ghorpade - Resume",
)

story = []

# --- Header ---
story.append(Paragraph("Khushi Ghorpade", name_style))
story.append(Paragraph("BCA Graduate | Cybersecurity Enthusiast", role_style))
story.append(Paragraph(
    "Sangli, Maharashtra &nbsp;|&nbsp; ghorpadekhushi1@gmail.com &nbsp;|&nbsp; +91 86691 52401 &nbsp;|&nbsp; "
    "linkedin.com/in/khushighorpade26 &nbsp;|&nbsp; github.com/Khu",
    contact_style,
))
story.append(HRFlowable(width="100%", thickness=1.2, color=ACCENT, spaceAfter=6))

def section(title):
    story.append(Paragraph(title.upper(), section_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=6))

def bullets(items):
    story.append(ListFlowable(
        [ListItem(Paragraph(i, bullet_style), leftIndent=10, bulletColor=INK) for i in items],
        bulletType="bullet", start="•", leftIndent=12, spaceAfter=6,
    ))

# --- Profile ---
section("Profile")
story.append(Paragraph(
    "BCA graduate with a CGPA of 8.0 and a strong interest in cybersecurity. Eager to begin "
    "a career in the cybersecurity domain, particularly in a Security Operations Center (SOC) "
    "role. Currently pursuing the Certified Ethical Hacker (CEH) course while expanding my "
    "knowledge through self-learning and cybersecurity workshops. Possess good communication, "
    "presentation, and problem-solving skills with a strong willingness to learn and grow in "
    "a professional environment.",
    body_style,
))

# --- Skills ---
section("Skills")
story.append(Paragraph(
    "Python (Basic) &nbsp;•&nbsp; HTML &nbsp;•&nbsp; CSS &nbsp;•&nbsp; MySQL &nbsp;•&nbsp; "
    "Cybersecurity Fundamentals &nbsp;•&nbsp; Basic Networking Concepts &nbsp;•&nbsp; "
    "Information Security Basics &nbsp;•&nbsp; Analytical Thinking &nbsp;•&nbsp; "
    "Problem Solving &nbsp;•&nbsp; Continuous Learning",
    body_style,
))

# --- Project Experience ---
section("Project Experience")
story.append(Paragraph("MiniGit — Web Application Project", entry_title_style))
story.append(Paragraph("2025 – 2026", entry_meta_style))
bullets([
    "Developed a web-based version control application using Python (Flask) and MySQL.",
    "Implemented user authentication and repository management.",
    "Performed database design and CRUD operations.",
    "Worked on frontend and backend integration using HTML, CSS, Flask, and MySQL.",
])

# --- Education ---
section("Education")
story.append(Paragraph("Bachelor of Computer Application (BCA)", entry_title_style))
story.append(Paragraph(
    "Chintamanrao Institute of Management, Development and Research, Sangli · 2023 – 2026 · CGPA: 8.0",
    entry_meta_style,
))
story.append(Spacer(1, 4))
story.append(Paragraph("Higher Secondary (HSC)", entry_title_style))
story.append(Paragraph("St. Thomas English School, Sangli · 2021 · Percentage: 88.40%", entry_meta_style))
story.append(Spacer(1, 4))
story.append(Paragraph("Secondary (SSC)", entry_title_style))
story.append(Paragraph(
    "Deccan Education Society's Willingdon College, Sangli · 2021 · Percentage: 62.83%",
    entry_meta_style,
))

# --- Certifications ---
section("Certifications")
bullets([
    "Certified Ethical Hacker (CEH) — currently pursuing",
    "Edureka Internship Completion Certificate",
    "Introduction to Cybersecurity — Great Learning",
    "Ethical Hacking Workshop Certificate",
    "HackingFlix Cybersecurity Workshop Certificate",
    "Communication Skills Certificate",
])

# --- Languages ---
section("Languages")
story.append(Paragraph("English &nbsp;•&nbsp; Hindi &nbsp;•&nbsp; Marathi", body_style))

doc.build(story)
print("resume.pdf generated.")
