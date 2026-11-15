import os
import xml.etree.ElementTree as ET
import json

base_dir = r"c:\Users\carol\Downloads\Hackaton Nasa\Hackaton Nasa"
audit_results = {}

# 1. RIMFAX PDS XML
rimfax_xml = os.path.join(base_dir, "DATA", "Mars", "RIMFAX", "sol400", "rimfax_calibrated_00400.xml")
if os.path.exists(rimfax_xml):
    tree = ET.parse(rimfax_xml)
    root = tree.getroot()
    rf_info = {}
    for elem in root.iter():
        tag = elem.tag.split("}")[-1]
        if tag in ["logical_identifier", "title", "product_class", "start_date_time", "stop_date_time"]:
            rf_info[tag] = elem.text.strip() if elem.text else ""
    audit_results["rimfax"] = rf_info
    print("[1] RIMFAX PDS Identification:")
    for k, v in rf_info.items():
        print(f"    {k}: {v}")

# 2. GPR Inventory & Frequency Check
gpr_dir = os.path.join(base_dir, "DATA", "DATA", "GPR Data")
gpr_profiles = []
for root_d, dirs, files in os.walk(gpr_dir):
    for f in sorted(files):
        if f.endswith(".SGY") and "Processed" in root_d:
            p = os.path.join(root_d, f)
            gpr_profiles.append({
                "file": f,
                "folder": os.path.relpath(root_d, gpr_dir),
                "size_kb": round(os.path.getsize(p) / 1024, 1)
            })
audit_results["gpr_processed_profiles"] = gpr_profiles
print(f"\n[2] GPR Processed Profiles: {len(gpr_profiles)} files verified")
for gp in gpr_profiles:
    print(f"    {gp['folder']}/{gp['file']} ({gp['size_kb']} KB)")

# 3. ERT Verification
ert_summary_path = os.path.join(base_dir, "src", "data", "processedCase1Summary.json")
if os.path.exists(ert_summary_path):
    with open(ert_summary_path, "r", encoding="utf-8") as f:
        case1_json = json.load(f)
    print("\n[3] Processed Case 1 Summary Cross-Check:")
    print("    SRTM S21E024 valid cells:", case1_json.get("earthSrtm", {}).get("S21E024", {}).get("validCells"))
    print("    GPR06 points checked:", case1_json.get("gpsTrackChecksAgainstSrtm", [{}])[0].get("points"))
    print("    GPR06 median slope (deg):", round(case1_json.get("gpsTrackChecksAgainstSrtm", [{}])[0].get("nearestSrtmSlopeDegrees", {}).get("median", 0), 4))
    print("    MOLA Jezero slope (deg):", round(case1_json.get("marsMola", {}).get("jezeroApproxSlopeDegrees", 0), 4))
    print("    Sentinel-2 GPR06 coverage:", case1_json.get("sentinel2Case1", {}).get("profileCoverage", {}).get("coveragePercent"), "%")
    print("    CRISM Jezero valid samples:", case1_json.get("crismJezero", {}).get("spectrum3x3", {}).get("validBandPixelSamples"))

# Save formal audit log
audit_log_path = os.path.join(base_dir, "DATA", "AUDITORIA_CASO_1_VERIFICACION.json")
with open(audit_log_path, "w", encoding="utf-8") as f:
    json.dump(audit_results, f, indent=2, ensure_ascii=False)
print(f"\nAudit log saved to: {audit_log_path}")
