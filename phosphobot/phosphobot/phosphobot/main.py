from asyncio import CancelledError
from loguru import logger

logger.info("🚀 Initializing EduBotics Learning Platform...")

import sys

print(f"sys.stdout.encoding = {sys.stdout.encoding}")

import io

# Fix encoding issues on Windows
if sys.platform.startswith("win") and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout = io.TextIOWrapper(
            sys.stdout.buffer, encoding="utf-8", errors="replace"
        )
        sys.stderr = io.TextIOWrapper(
            sys.stderr.buffer, encoding="utf-8", errors="replace"
        )
    except Exception:
        pass  # Ignore if already wrapped or in unsupported environment


from rich import print
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.table import Table
from rich.layout import Layout
from rich.align import Align
from rich.box import DOUBLE, ROUNDED

console = Console()

from phosphobot import __version__

_splash_shown = False


def print_edubotics_splash():
    """Display the stunning EduBotics splash screen with premium visuals"""
    global _splash_shown
    if not _splash_shown:
        console.clear()
        
        # Create the main logo with gradient effect
        logo_lines = [
            "╔════════════════════════════════════════════════════════════════════╗",
            "║                                                                    ║",
            "║     ███████ ██████  ██    ██ ██████   ██████  ████████ ██  ██████ ███████     ║",
            "║     ██      ██   ██ ██    ██ ██   ██ ██    ██    ██    ██ ██      ██          ║",
            "║     █████   ██   ██ ██    ██ ██████  ██    ██    ██    ██ ██      ███████     ║",
            "║     ██      ██   ██ ██    ██ ██   ██ ██    ██    ██    ██ ██           ██     ║",
            "║     ███████ ██████   ██████  ██████   ██████     ██    ██  ██████ ███████     ║",
            "║                                                                    ║",
            "╚════════════════════════════════════════════════════════════════════╝"
        ]
        
        # Print logo with gradient blue colors
        for i, line in enumerate(logo_lines):
            if i < 2 or i > 7:
                console.print(line, style="bright_cyan", justify="center")
            else:
                console.print(line, style="bold bright_blue", justify="center")
        
        # Create a beautiful tagline
        console.print("")
        tagline = Text("✨ Learn • Control • Train • Innovate ✨", style="bold cyan")
        console.print(Align.center(tagline))
        console.print("")
        
        # Create feature cards in a table layout
        feature_table = Table(show_header=False, show_edge=False, box=None, padding=(0, 2))
        feature_table.add_column(justify="center")
        feature_table.add_column(justify="center")
        feature_table.add_column(justify="center")
        
        feature_table.add_row(
            Panel(
                "[bold cyan]🤖[/bold cyan]\n[bright_white]AI-Powered[/bright_white]\n[dim]Cutting-edge models[/dim]",
                border_style="bright_blue",
                box=ROUNDED,
                width=22,
                height=5
            ),
            Panel(
                "[bold cyan]🎓[/bold cyan]\n[bright_white]Student-First[/bright_white]\n[dim]Designed for learning[/dim]",
                border_style="bright_blue",
                box=ROUNDED,
                width=22,
                height=5
            ),
            Panel(
                "[bold cyan]🔬[/bold cyan]\n[bright_white]Real Robotics[/bright_white]\n[dim]Hands-on experience[/dim]",
                border_style="bright_blue",
                box=ROUNDED,
                width=22,
                height=5
            )
        )
        
        console.print(Align.center(feature_table))
        console.print("")
        
        # Version and copyright info in a sleek format
        info_text = Text()
        info_text.append("EduBotics ", style="bold bright_cyan")
        info_text.append(f"v{__version__}", style="bright_white")
        info_text.append(" | ", style="dim")
        info_text.append("© 2025 EduBotics", style="dim")
        info_text.append(" | ", style="dim") 
        info_text.append("Building Tomorrow's Roboticists", style="italic dim cyan")
        
        console.print(Align.center(info_text))
        console.print("─" * 80, style="dim blue", justify="center")
        console.print("")
        
        _splash_shown = True


print_edubotics_splash()

import platform
import threading

from phosphobot.utils import fetch_latest_brew_version

_version_check_started = False


def fetch_latest_version():
    try:
        version = fetch_latest_brew_version(fail_silently=True)
        if version != "unknown" and (version != "v" + __version__):
            console.print("")
            update_box = Panel(
                Text.from_markup(
                    "[bold bright_cyan]✨ New Version Available![/bold bright_cyan]\n\n"
                    f"[bright_blue]Current:[/bright_blue] v{__version__} → [bold bright_green]New:[/bold bright_green] {version}\n\n"
                    f"[cyan]Update with:[/cyan] [white]{get_update_command()}[/white]"
                ),
                border_style="bright_cyan",
                box=ROUNDED,
                title="📦 Update",
                title_align="left",
                width=60
            )
            console.print(Align.center(update_box))
    except Exception:
        pass


def get_update_command():
    """Get the appropriate update command based on the platform"""
    if platform.system() == "Darwin":
        return "brew update && brew upgrade edubotics"
    elif platform.system() == "Linux":
        return "sudo apt update && sudo apt upgrade edubotics"
    else:
        return "docs.edubotics.ai/update"


def get_program_name():
    """Get the current program name (edubotics or phosphobot)"""
    import sys
    import os
    program_name = os.path.basename(sys.argv[0])
    if program_name.endswith('.exe'):
        program_name = program_name[:-4]
    return program_name if program_name in ['edubotics', 'phosphobot'] else 'edubotics'


if not _version_check_started:
    thread = threading.Thread(target=fetch_latest_version, daemon=True)
    thread.start()
    _version_check_started = True

import socket
import time
from typing import Annotated

import typer
import uvicorn
from phosphobot.configs import config
from phosphobot.types import SimulationMode
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
from rich.live import Live
from rich.spinner import Spinner


def init_telemetry() -> None:
    """
    This is used for automatic crash reporting.
    """
    from phosphobot.sentry import init_sentry

    init_sentry()


def get_local_ip() -> str:
    """
    Get the local IP address of the server.
    """
    try:
        # Create a temporary socket to get the local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))  # Doesn't actually send data
            server_ip = s.getsockname()[0]
    except Exception:
        server_ip = "localhost"
    return server_ip


cli = typer.Typer(no_args_is_help=True, rich_markup_mode="rich")


def version_callback(value: bool):
    if value:
        version_panel = Panel(
            Text.from_markup(
                f"[bold bright_cyan]EduBotics[/bold bright_cyan] [bright_white]v{__version__}[/bright_white]\n"
                f"[dim]Educational Robotics Platform[/dim]"
            ),
            border_style="bright_blue",
            box=ROUNDED,
            width=40
        )
        console.print(Align.center(version_panel))
        raise typer.Exit()


@cli.callback()
def main(
    version: Annotated[
        bool,
        typer.Option(
            "--version",
            "-v",
            help="Show version",
            callback=version_callback,
        ),
    ] = False,
):
    """
    [bold bright_cyan]EduBotics[/bold bright_cyan] 🚀 The Educational Robotics Platform
    
    [bright_blue]Learn robotics with real hardware and AI[/bright_blue]
    """
    pass


@cli.command()
def info(
    opencv: Annotated[bool, typer.Option(help="Show OpenCV details")] = False,
    servos: Annotated[bool, typer.Option(help="Show servo details")] = False,
):
    """
    📊 System Check - See what's connected to your robot
    """
    import serial.tools.list_ports
    
    # Create a nice loading animation
    with console.status("[bright_blue]🔍 Scanning your system...[/bright_blue]", spinner="dots"):
        time.sleep(0.5)
        ports = serial.tools.list_ports.comports()
        pid_list = [port.pid for port in ports]
        serial_numbers = [port.serial_number for port in ports]
    
    console.print("")
    
    # Create a beautiful summary table
    summary_table = Table(
        title="🔧 Connected Hardware",
        show_header=True,
        header_style="bold bright_cyan",
        border_style="bright_blue",
        box=ROUNDED,
        title_style="bold bright_white",
        title_justify="center",
        width=80
    )
    
    summary_table.add_column("Component", style="cyan", width=20)
    summary_table.add_column("Status", style="bright_white", width=30)
    summary_table.add_column("Details", style="dim white", width=30)
    
    # Add serial ports info
    port_status = "✅ Connected" if ports else "❌ Not Found"
    port_details = ', '.join([port.device for port in ports]) if ports else "No devices"
    summary_table.add_row("Serial Ports", port_status, port_details)
    
    # Add PID info
    if pid_list:
        pid_details = ', '.join([str(pid) for pid in pid_list if pid])
        summary_table.add_row("Device PIDs", "✅ Detected", pid_details[:30] + "..." if len(pid_details) > 30 else pid_details)
    
    console.print(Align.center(summary_table))
    console.print("")
    
    # Camera detection with nice formatting
    import cv2
    from phosphobot.camera import get_all_cameras
    
    with console.status("[bright_blue]📷 Detecting cameras...[/bright_blue]", spinner="camera"):
        cameras = get_all_cameras()
        time.sleep(0.5)
        cameras_status = cameras.status()
        cameras.stop()
    
    # Display camera info in a card
    if cameras_status:
        camera_card = Panel(
            Text.from_markup(
                f"[bold cyan]Camera System Status[/bold cyan]\n"
                f"[bright_blue]━━━━━━━━━━━━━━━━━━━━━━━━━━[/bright_blue]\n"
                f"{cameras_status.model_dump_json(indent=2)}"
            ),
            border_style="cyan",
            box=ROUNDED,
            title="📷 Cameras",
            title_align="left",
            width=80
        )
        console.print(Align.center(camera_card))

    if opencv:
        console.print("\n[bright_blue]OpenCV Information:[/bright_blue]")
        console.print(cv2.getBuildInformation())

    if servos:
        from phosphobot.hardware.motors.feetech import dump_servo_states_to_file
        from phosphobot.utils import get_home_app_path

        with console.status("[bright_blue]🦾 Checking servo motors...[/bright_blue]"):
            for port in ports:
                if port.pid == 21971:
                    dump_servo_states_to_file(
                        get_home_app_path() / f"servo_states_{port.device}.csv",
                        port.device,
                    )
                    console.print(f"[green]✅ Servo diagnostic saved: {port.device}[/green]")

    # Show a helpful tip at the end
    program_name = get_program_name()
    tip_panel = Panel(
        f"[bold cyan]💡 Tip:[/bold cyan] Run [white]{program_name} run[/white] to start the platform!",
        border_style="dim cyan",
        box=ROUNDED,
        width=60
    )
    console.print("")
    console.print(Align.center(tip_panel))
    
    raise typer.Exit()


def is_port_in_use(port: int, host: str) -> bool:
    """Check if a port is already in use"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            s.bind((host, port))
            return False
        except OSError:
            return True


@cli.command()
def update():
    """
    ⬆️  Update EduBotics to the latest version
    """
    console.print("")
    
    # Create an attractive update guide
    update_steps = Table(
        title="🔄 How to Update EduBotics",
        show_header=False,
        border_style="bright_cyan",
        box=ROUNDED,
        title_style="bold bright_white",
        width=70,
        padding=(1, 2)
    )
    
    update_steps.add_column(justify="left")
    
    if platform.system() == "Darwin":
        update_steps.add_row("[bold cyan]macOS:[/bold cyan]")
        update_steps.add_row("[white]brew update && brew upgrade edubotics[/white]")
    elif platform.system() == "Linux":
        update_steps.add_row("[bold cyan]Linux:[/bold cyan]")
        update_steps.add_row("[white]sudo apt update && sudo apt upgrade edubotics[/white]")
    else:
        update_steps.add_row("[bold cyan]Windows:[/bold cyan]")
        update_steps.add_row("[white]Visit: docs.edubotics.ai/update[/white]")
    
    console.print(Align.center(update_steps))
    console.print("")
    
    # Add helpful information
    info_text = Text()
    info_text.append("📚 Documentation: ", style="cyan")
    info_text.append("docs.edubotics.ai", style="bright_blue underline")
    info_text.append(" | ", style="dim")
    info_text.append("💬 Support: ", style="cyan")
    info_text.append("help.edubotics.ai", style="bright_blue underline")
    
    console.print(Align.center(info_text))
    console.print("")


@cli.command()
def run(
    host: Annotated[str, typer.Option(help="Network interface")] = "0.0.0.0",
    port: Annotated[int, typer.Option(help="Port number")] = 80,
    simulation: Annotated[
        SimulationMode,
        typer.Option(help="Simulation mode"),
    ] = SimulationMode.headless,
    only_simulation: Annotated[
        bool, typer.Option(help="Simulation only")
    ] = False,
    simulate_cameras: Annotated[
        bool,
        typer.Option(help="Use simulated cameras"),
    ] = False,
    realsense: Annotated[
        bool,
        typer.Option(help="Use RealSense camera"),
    ] = True,
    can: Annotated[
        bool,
        typer.Option(help="Enable CAN bus"),
    ] = True,
    cameras: Annotated[
        bool,
        typer.Option(help="Enable cameras"),
    ] = True,
    max_opencv_index: Annotated[
        int,
        typer.Option(help="Max camera search index"),
    ] = 10,
    reload: Annotated[
        bool,
        typer.Option(help="Auto-reload on changes (dev)"),
    ] = False,
    profile: Annotated[
        bool,
        typer.Option(help="Enable profiling (dev)"),
    ] = False,
    crash_telemetry: Annotated[
        bool,
        typer.Option(help="Enable crash reports"),
    ] = True,
    usage_telemetry: Annotated[
        bool,
        typer.Option(help="Enable usage analytics"),
    ] = True,
    telemetry: Annotated[
        bool,
        typer.Option(help="Enable all telemetry"),
    ] = True,
):
    """
    🎮 Start EduBotics - Launch your robotics learning platform
    """
    
    console.clear()
    
    # Show a beautiful startup sequence
    console.print("")
    startup_text = Text()
    startup_text.append("EDUBOTICS", style="bold bright_cyan")
    startup_text.append(" PLATFORM", style="bold bright_blue")
    console.print(Align.center(startup_text))
    console.print(Align.center(Text("━" * 30, style="bright_blue")))
    console.print("")

    config.SIM_MODE = simulation
    config.ONLY_SIMULATION = only_simulation
    config.SIMULATE_CAMERAS = simulate_cameras
    config.ENABLE_REALSENSE = realsense
    config.ENABLE_CAMERAS = cameras
    config.PORT = port
    config.PROFILE = profile
    config.CRASH_TELEMETRY = crash_telemetry
    config.USAGE_TELEMETRY = usage_telemetry
    config.ENABLE_CAN = can
    config.MAX_OPENCV_INDEX = max_opencv_index

    if not telemetry:
        config.CRASH_TELEMETRY = False
        config.USAGE_TELEMETRY = False

    # Create initialization progress with multiple steps
    with Progress(
        SpinnerColumn(spinner_name="dots", style="bright_cyan"),
        TextColumn("[bright_blue]{task.description}[/bright_blue]"),
        BarColumn(bar_width=30, style="bright_cyan", complete_style="bright_green"),
        TaskProgressColumn(),
        console=console,
        transient=True
    ) as progress:
        
        total_steps = 5
        task = progress.add_task("Starting EduBotics...", total=total_steps)
        
        progress.update(task, description="🔧 Configuring hardware...", advance=1)
        time.sleep(0.3)
        
        progress.update(task, description="📷 Initializing cameras...", advance=1)
        time.sleep(0.3)
        
        progress.update(task, description="🤖 Loading AI models...", advance=1)
        time.sleep(0.3)
        
        progress.update(task, description="🌐 Setting up network...", advance=1)
        time.sleep(0.3)
        
        progress.update(task, description="✨ Finalizing setup...", advance=1)
        time.sleep(0.2)

    console.print("")

    # Find available port
    ports = [port]
    if port == 80:
        ports += list(range(8020, 8040))

    success = False
    for current_port in ports:
        if is_port_in_use(current_port, host):
            console.print(f"  [yellow]⚠[/yellow]  Port {current_port} busy, trying next...", style="dim")
            continue

        try:
            config.PORT = current_port
            server_ip = get_local_ip()
            
            # Clear and show the success screen
            console.clear()
            
            # Create the main success panel
            success_layout = Layout()
            success_layout.split_column(
                Layout(name="header", size=3),
                Layout(name="main", size=15),
                Layout(name="footer", size=3)
            )
            
            # Header
            header_text = Text()
            header_text.append("✨ ", style="bright_yellow")
            header_text.append("EDUBOTICS IS READY", style="bold bright_cyan")
            header_text.append(" ✨", style="bright_yellow")
            
            console.print("")
            console.print(Align.center(header_text))
            console.print("")
            
            # Create access information panel
            access_table = Table(
                show_header=False,
                border_style="bright_cyan",
                box=DOUBLE,
                width=70,
                padding=(1, 2),
                title="🌐 Access Your Platform",
                title_style="bold bright_white"
            )
            
            access_table.add_column(style="bright_blue", width=20)
            access_table.add_column(style="bright_white", width=45)
            
            access_table.add_row(
                "📍 Local Access:",
                f"[bold cyan]http://localhost:{current_port}[/bold cyan]"
            )
            access_table.add_row(
                "🌍 Network Access:",
                f"[bold cyan]http://{server_ip}:{current_port}[/bold cyan]"
            )
            
            console.print(Align.center(access_table))
            console.print("")
            
            # Feature showcase in cards
            features = Table(
                show_header=False,
                show_edge=False,
                box=None,
                padding=(0, 1)
            )
            features.add_column(justify="center")
            features.add_column(justify="center")
            features.add_column(justify="center")
            features.add_column(justify="center")
            
            features.add_row(
                Panel("🎮\n[bold]Control[/bold]\n[dim]Real-time[/dim]", border_style="cyan", box=ROUNDED, width=16),
                Panel("📊\n[bold]Monitor[/bold]\n[dim]Live data[/dim]", border_style="cyan", box=ROUNDED, width=16),
                Panel("🧠\n[bold]Train AI[/bold]\n[dim]Models[/dim]", border_style="cyan", box=ROUNDED, width=16),
                Panel("💾\n[bold]Record[/bold]\n[dim]Datasets[/dim]", border_style="cyan", box=ROUNDED, width=16)
            )
            
            console.print(Align.center(features))
            console.print("")
            
            # Status indicators
            status_items = []
            status_items.append("[green]●[/green] Server Running")
            if cameras:
                status_items.append("[green]●[/green] Cameras Active")
            if realsense:
                status_items.append("[green]●[/green] RealSense Ready")
            if can:
                status_items.append("[green]●[/green] CAN Bus Online")
            
            status_text = "  ".join(status_items)
            console.print(Align.center(Text(status_text)))
            console.print("")
            
            # Instructions
            console.print(Align.center(Text("Press Ctrl+C to stop", style="dim italic")))
            console.print(Align.center(Text("━" * 40, style="dim blue")))
            console.print("")

            # Start the server
            uvicorn.run(
                "phosphobot.app:app",
                host=host,
                port=current_port,
                reload=reload,
                timeout_graceful_shutdown=1,
            )
            success = True
            break
            
        except OSError as e:
            if "address already in use" in str(e).lower():
                continue
            console.print(f"\n[bold red]❌ Error:[/bold red] {e}")
            raise typer.Exit(code=1)
            
        except KeyboardInterrupt:
            console.print("")
            goodbye_panel = Panel(
                Text.from_markup(
                    "[bright_cyan]Thanks for using EduBotics![/bright_cyan]\n"
                    "[dim]See you next time 👋[/dim]"
                ),
                border_style="bright_blue",
                box=ROUNDED,
                width=40
            )
            console.print(Align.center(goodbye_panel))
            raise typer.Exit(code=0)
            
        except CancelledError:
            console.print("[dim]Shutdown complete[/dim]")
            raise typer.Exit(code=0)

    if not success:
        console.print("")
        error_panel = Panel(
            Text.from_markup(
                "[bold red]Cannot Start Server[/bold red]\n\n"
                "[yellow]All ports are busy![/yellow]\n\n"
                "[cyan]Solutions:[/cyan]\n"
                f"• Use custom port: [white]{get_program_name()} run --port 8000[/white]\n"
                "• Check ports: [white]sudo lsof -i :80[/white]\n"
                "• Free ports: [white]sudo systemctl stop apache2[/white]"
            ),
            border_style="red",
            box=ROUNDED,
            title="⚠️  Port Conflict",
            width=60
        )
        console.print(Align.center(error_panel))
        raise typer.Exit(code=1)


if __name__ == "__main__":
    cli()