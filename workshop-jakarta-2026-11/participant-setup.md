# Participant Setup — AI or DIE Workshop Jakarta

Please complete this **at home before the workshop**. Venue Wi-Fi is shared by 30 people and
cannot download several gigabytes per laptop. It takes about 30–45 minutes.

## Laptop

- Windows 10/11, macOS, or Linux
- **At least 8 GB RAM** (16 GB recommended), 15 GB free disk space
- Charger (power outlets are available at every seat)

## Install

1. **JDK 21** — e.g. [Eclipse Temurin](https://adoptium.net/)
   Check: `java -version`
2. **Maven 3.9+** — <https://maven.apache.org/download.cgi>
   Check: `mvn -version`
3. **Git** — <https://git-scm.com/>
4. **IDE** — IntelliJ IDEA Community or VS Code with the Java extension pack
5. **Ollama** — <https://ollama.com/download>
   Then download the workshop models:
   ```bash
   ollama pull llama3.2:3b
   ollama pull nomic-embed-text
   ```
   Check: `ollama run llama3.2:3b "Halo, apa kabar?"` should answer.

## Pre-load the workshop project

The repository link will be sent to registered participants one week before the workshop.

```bash
git clone <workshop-repository-url>
cd <workshop-repository>
mvn -q dependency:go-offline
```

## Stuck?

Post your question in the participant group, or come at **08:30** on the day —
assistants will help during registration. USB sticks with installers and models are available
as a fallback.

Sampai jumpa di Jakarta!
